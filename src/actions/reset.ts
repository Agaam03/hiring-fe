import { actionCodeSettings } from "@/lib/actionCodeSettings";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export const reset = async (values: { email: string }) => {
  try {
    const { email } = values;
    if (!email) return { error: "Email is required." };

    await sendPasswordResetEmail(auth, email, actionCodeSettings.resetPassword);

    return {
      success:
        "Email reset password telah dikirim! Silakan periksa inbox kamu.",
    };
  } catch (error: any) {
    console.error("Reset password error:", error);
    let message = "Gagal mengirim email reset password.";

    switch (error.code) {
      case "auth/invalid-email":
        message = "Format email tidak valid.";
        break;
      case "auth/user-not-found":
        message = "Akun dengan email ini tidak ditemukan.";
        break;
      default:
        message = error.message;
    }

    return { error: message };
  }
};
