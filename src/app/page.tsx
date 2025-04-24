"use client";
import { useAuth } from "@/context/AuthProvider";
import styles from "./page.module.css";
import AuthCard from "@/components/AuthCard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/mypage");
    }
  }, [router, user]);
  return (
    <div className={styles.page}>
      <AuthCard type="signIn" />
    </div>
  );
}
