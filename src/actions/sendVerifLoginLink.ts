import { auth } from "@/lib/firebase";
import { sendSignInLinkToEmail, fetchSignInMethodsForEmail } from "firebase/auth";
import { actionCodeSettings } from "@/lib/actionCodeSettings";

export const sendVerifLoginLink = async (email: string) => {
  try {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    // if (methods.length === 0) {
    //   return { error: "Email belum terdaftar. Silakan register terlebih dahulu." };
    // }

    await sendSignInLinkToEmail(auth, email, actionCodeSettings.verifyLogin);
    localStorage.setItem("emailForSignIn", email);

    return {
      success: "Link login telah dikirim! Silakan cek email kamu.",
    };
  } catch (error: any) {
    console.error("Error sending verification link:", error);
    let message = "Gagal mengirim link verifikasi login.";

    if (error.code === "auth/invalid-email") message = "Format email tidak valid.";
    if (error.code === "auth/too-many-requests") message = "Terlalu banyak permintaan. Coba lagi nanti.";

    return { error: message };
  }
};
