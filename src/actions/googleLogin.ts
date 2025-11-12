 

import { auth, googleProvider, db } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    if (!user.email) {
      throw new Error("Google account has no email.");
    }

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || "Unknown User",
        email: user.email,
        photo: user.photoURL || null,
        verified: user.emailVerified,
        createdAt: serverTimestamp(),
        provider: "google",
      });
    }

    return {
      success: "Login successful with Google!",
      user: {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        verified: user.emailVerified,
      },
    };
  } catch (error: any) {
    console.error("Google Login Error:", error);

    let message = "Google login failed.";
    switch (error.code) {
      case "auth/popup-closed-by-user":
        message = "Popup closed before completing sign in.";
        break;
      case "auth/cancelled-popup-request":
        message = "Login popup was cancelled.";
        break;
      default:
        message = error.message || message;
        break;
    }

    return { error: message };
  }
};
