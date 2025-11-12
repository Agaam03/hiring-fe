"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const LinkSendedPage = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(storedUser);
      setTimeout(() => {
        window.localStorage.removeItem("userData");
      }, 15000);
    }
  }, []);
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center">
        {/* Login Card */}
        <div className="bg-white w-full max-w-xl shadow-lg p-8 space-y-6">
          {/* Title */}
          <h1 className="text-2xl text-center font-bold">Periksa Email Anda</h1>
          <p className="text-center">
            {user
              ? `Kami sudah mengirimkan link verifikasi ke ${user} yang berlaku dalam 30 menit`
              : "Tidak ada data pengguna ditemukan."}
          </p>
          <Image
            src="/verif-img.png"
            alt="Mail Sent Illustration"
            width={300}
            height={300}
            className="mx-auto"
          />
        </div>
      </div>
    </>
  );
};

export default LinkSendedPage;
