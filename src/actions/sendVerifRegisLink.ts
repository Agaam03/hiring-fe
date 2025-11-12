import { auth } from "@/lib/firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
import { actionCodeSettings } from "@/lib/actionCodeSettings";

export const sendVerifRegisLink = async (email: string) => {
  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings.verifyLogin);

    if (typeof window !== "undefined") {
      localStorage.setItem("emailForSignIn", email);
    }

    return { success: "Link verifikasi telah dikirim! Silakan cek email kamu." };
  } catch (error: any) {
    console.error("Error sending verification link:", error);

    let message = "Gagal mengirim link verifikasi.";
    if (error.code === "auth/invalid-email") message = "Format email tidak valid.";
    if (error.code === "auth/too-many-requests") message = "Terlalu banyak permintaan. Coba lagi nanti.";

    return { error: message };
  }
};
