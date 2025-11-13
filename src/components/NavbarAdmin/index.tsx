"use client";

import React, { useEffect, useState, useRef } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import LogoNav from "../LogoNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";


const NavbarAdmin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  const handleLogout = async () => {
    try {

      await signOut(auth);


      if (typeof window !== "undefined") {
        localStorage.removeItem("firebaseToken"); 
        localStorage.removeItem("userUID");
      }
      router.push("/login");
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, error: "Gagal logout." };
    }
  };
  const handleLogin = () => {
    router.push("/login");
  };
  console.log(user);
  const goToHome = () => {
    router.push("/");
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full flex justify-between items-center mx-auto px-6 py-2 bg-white text-white shadow-md">
      <main className="flex justify-between items-center mx-auto w-full">
        <LogoNav />

        <div className="flex items-center space-x-3">
          {/* Tombol login/logout tergantung status user */}
          {user ? (
            <button
              onClick={handleLogout}
              className="text-primary-green cursor-pointer hover:text-primary-hover font-semibold"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="text-primary-green cursor-pointer hover:text-primary-hover font-semibold"
            >
              Login
            </button>
          )}

          {/* Avatar hanya muncul jika user login */}
          {user && (
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setOpenDropdown(true)}
              onMouseLeave={() => setOpenDropdown(false)}
            >
              <Avatar
                className="cursor-pointer w-9 h-9 border border-gray-200"
                onClick={() => setOpenDropdown(!openDropdown)}
              >
                {user?.photoURL ? (
                  <AvatarImage
                    src={user.photoURL}
                    alt="User Avatar"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <AvatarFallback className="bg-primary-green text-white font-medium">
                    {user?.displayName?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                )}
              </Avatar>

              <AnimatePresence>
                {openDropdown && (
                  <motion.div
                    key="dropdown"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50"
                  >
                    <div className="p-3 border-b text-sm text-gray-600">
                      {user?.displayName || user?.email || "User"}
                    </div>
                    <button
                      onClick={goToHome}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                    >
                      Home
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>
    </nav>
  );
};

export default NavbarAdmin;
