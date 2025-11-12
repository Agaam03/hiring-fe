// src/actions/register.ts
import { actionCodeSettings } from "@/lib/actionCodeSettings";
import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export const register = async (values: {
  email: string;
  password: string;
}) => {
  try {
    const { email, password } = values;
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);

    if (signInMethods.length > 0) {
      const provider = signInMethods[0];
      let providerName = "lain";
      if (provider === "google.com") providerName = "Google";
      else if (provider === "facebook.com") providerName = "Facebook";
      else if (provider === "password") providerName = "Email & Password";

      return {
        error: `Email ini sudah terdaftar menggunakan ${providerName}. Silakan login dengan akun ${providerName} tersebut.`,
      };
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const name = email.split("@")[0];
    const photo = email.charAt(0).toUpperCase();

    await updateProfile(user, { displayName: name });

    await sendEmailVerification(user, actionCodeSettings.verifyLogin);

    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      name,
      email,
      photo,
      verified: user.emailVerified,
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
    });

    return {
      success: "Akun berhasil dibuat! Silakan cek email Anda untuk verifikasi sebelum login.",
    };
  } catch (error: any) {
    console.error("Register error:", error);
    let message = "Registration failed.";

    switch (error.code) {
      case "auth/email-already-in-use":
        message = "Email sudah terdaftar dengan provider lain.";
        break;
      case "auth/invalid-email":
        message = "Format email tidak valid.";
        break;
      case "auth/weak-password":
        message = "Password harus memiliki minimal 6 karakter.";
        break;
      default:
        message = error.message;
    }

    return { error: message };
  }
};
