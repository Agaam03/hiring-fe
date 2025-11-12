"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import LogoLogin from "@/components/LogoLogin";

const VerifyLoginPage = () => {
  const router = useRouter();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const verifyLogin = async () => {
    router.push("/");
  };

  // const verifyEmailLink = async () => {
  //   if (isSignInWithEmailLink(auth, window.location.href)) {
  //     let email = window.localStorage.getItem("emailForSignIn");

  //     if (!email) {
  //       email = window.prompt("Masukkan email kamu untuk verifikasi:");
  //     }

  //     try {
  //       const result = await signInWithEmailLink(
  //         auth,
  //         email!,
  //         window.location.href
  //       );

  //       window.localStorage.removeItem("emailForSignIn");
  //       setMessage("Verifikasi berhasil! Kamu akan diarahkan ke Login...");
  //       router.push("/login");
  //     } catch (error) {
  //       console.error("Error verifying link:", error);
  //       setMessage("Gagal memverifikasi link. Silakan coba lagi.");
  //     }
  //   } else {
  //     setMessage("Link tidak valid atau sudah digunakan.");
  //   }
  // };
  return (
    <>
      <div className="min-h-screen flex flex-col  justify-center items-center">
        {/* Logo */}
        <div className=" flex items-center justify-start ">
          <LogoLogin />
        </div>

        {/* Login Card */}
        <div className="bg-white w-full max-w-xl p-4  border-y-[0.3px] border-gray-100">
          <h1>Hai,</h1>
          <p>
            Berikut adalah <span className="font-bold">link masuk</span> yang
            kamu request dari{" "}
            <a href="http://localhost:3000/" className="text-primary-green">
              www.rakamin.com
            </a>
          </p>
        </div>
        <div className="flex flex-col items-center justify-center w-full max-w-xl">
          <button
            onClick={verifyLogin}
            disabled={status === "loading"}
            className="bg-primary-green px-3 py-2 text-white rounded-md my-3 text-sm cursor-pointer"
          >
            {status === "loading" ? "Memverifikasi..." : "Masuk ke Rakamin"}
          </button>
          {/* Feedback */}
          <p className="text-xs text-danger-red">{message}</p>
          <FormError message={error} />
          <FormSuccess message={success} />
          <p className="text-gray-400 text-xs text-center mt-2">
            Untuk keamanan, link hanya dapat diakses dalam 30 menit. Jika kamu
            tidak ada permintaan untuk login melalui link, abaikan pesan ini.
          </p>
        </div>
      </div>
    </>
  );
};

export default VerifyLoginPage;
