"use server";

import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { cookies } from "next/headers";

export const login = async (values: { email: string; password: string }) => {
  try {
    const { email, password } = values;

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      return { error: "Email belum diverifikasi. Silakan periksa inbox Anda." };
    }
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      await updateDoc(userRef, { lastLoginAt: serverTimestamp() });
    } else {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || "",
        email: user.email,
        photo: user.photoURL || "",
        verified: user.emailVerified,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
      });
    }

    const token = await user.getIdToken();

    const cookieStore = cookies();
    (await cookieStore).set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, 
    });

    if (typeof window !== "undefined") {
      localStorage.setItem("userUID", user.uid);
    }

    return {
      success: "Login berhasil!",
      user: { uid: user.uid, email: user.email },
    };
  } catch (error: any) {
    console.error("Firebase login error:", error);
    let message = "Login gagal.";

    switch (error.code) {
      case "auth/invalid-email":
        message = "Format email tidak valid.";
        break;
      case "auth/user-disabled":
        message = "Akun dinonaktifkan.";
        break;
      case "auth/user-not-found":
        message = "Pengguna tidak ditemukan.";
        break;
      case "auth/wrong-password":
        message = "Password salah.";
        break;
      case "auth/invalid-credential":
        message = "Email belum dibuat.";
        break;
      default:
        message = error.message || message;
    }

    return { error: message };
  }
};
