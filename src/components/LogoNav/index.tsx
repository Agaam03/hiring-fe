"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { use } from "react";

const LogoNav = () => {
  const router = useRouter();
  const onClickLogo = () => {
    router.push("/");
  };
  return (
    <div className="cursor-pointer" onClick={onClickLogo}>
      <Image
        src="/rakamin-career-logo.png"
        alt="Logo"
        width={110}
        height={40}
        className="object-contain"
      />
    </div>
  );
};

export default LogoNav;
