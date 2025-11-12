import Image from "next/image";
import React from "react";

const LogoLogin = () => {
  return (
    <div>
      <Image
        src="/rakamin-logo.png"
        alt="Logo"
        width={130}
        height={40}
        className="object-contain"
      />
    </div>
  );
};

export default LogoLogin;
