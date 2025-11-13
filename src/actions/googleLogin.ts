import { auth, googleProvider, db } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

export const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    if (!user.email) throw new Error("Akun Google tidak memiliki email.");

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      await updateDoc(userRef, { lastLoginAt: serverTimestamp() });
    } else {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || "Unknown User",
        email: user.email,
        photo: user.photoURL || null,
        verified: user.emailVerified,
        createdAt: serverTimestamp(),
        provider: "google",
        lastLoginAt: serverTimestamp(),
      });
    }

    const token = await user.getIdToken();

    if (typeof window !== "undefined") {
      localStorage.setItem("userUID", user.uid);
      localStorage.setItem("session", token);
    }

    return {
      success: "Login dengan Google berhasil!",
      user: {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
      },
    };
  } catch (error: any) {
    console.error("Google Login Error:", error);
    let message = "Login Google gagal.";

    switch (error.code) {
      case "auth/popup-closed-by-user":
        message = "Popup ditutup sebelum proses login selesai.";
        break;
      case "auth/cancelled-popup-request":
        message = "Login popup dibatalkan.";
        break;
      default:
        message = error.message || message;
    }

    return { error: message };
  }
};
