"use client";
import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (!user) {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  return <>{children}</>;
}
