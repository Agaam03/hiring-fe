"use client";

import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogoNav from "../LogoNav";
import { useRouter } from "next/navigation";

const NavbarAdmin = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
      return { success: "Berhasil logout." };
    } catch (error: any) {
      console.error("Logout error:", error);
      return { error: "Gagal logout. Silakan coba lagi." };
    }
  };

  console.log(user);

  return (
    <nav className="w-full   flex justify-between items-center mx-auto px-6 py-2 bg-white text-white shadow-md">
      <main className=" flex justify-between items-center mx-auto w-full">
        <LogoNav />

        <div className="flex items-center space-x-3">
          <button
            onClick={handleLogout}
            className="text-primary-green cursor-pointer hover:text-primary-hover font-semibold"
          >
            Logout
          </button>
          <Avatar className="cursor-pointer w-8 h-8">
            {user?.photoURL ? (
              <AvatarImage
                src={user.photoURL}
                alt="User Avatar"
                referrerPolicy="no-referrer"
              />
            ) : (
              <AvatarFallback className="bg-white text-black font-medium">
                {user?.displayName?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            )}
          </Avatar>
        </div>
      </main>
    </nav>
  );
};

export default NavbarAdmin;
