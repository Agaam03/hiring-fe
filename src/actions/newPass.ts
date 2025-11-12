"use server";

import { auth } from "@/lib/firebase";
import { confirmPasswordReset } from "firebase/auth";
import { z } from "zod";
import { NewPasswordSchema } from "@/schemas";

export const newPass = async (values: z.infer<typeof NewPasswordSchema>) => {
  try {
    const validatedFields = NewPasswordSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Password tidak valid" };
    }

    const { password, oobCode } = validatedFields.data;

    if (!oobCode) {
      return { error: "Kode reset tidak ditemukan atau sudah kadaluarsa" };
    }

    await confirmPasswordReset(auth, oobCode, password);

    return {
      success: "Password berhasil diperbarui. Silakan login kembali.",
    };
  } catch (error: any) {
    console.error(error);

    let msg = "Terjadi kesalahan saat reset password.";
    if (error.code === "auth/expired-action-code") {
      msg = "Link reset password sudah kadaluarsa.";
    } else if (error.code === "auth/invalid-action-code") {
      msg = "Kode reset password tidak valid.";
    }

    return { error: msg };
  }
};
