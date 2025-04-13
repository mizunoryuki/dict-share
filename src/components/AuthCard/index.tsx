"use client";
import { useState } from "react";
import { AuthForm } from "../AuthForm";
import styles from "./index.module.css";
import { Button } from "../Button";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

interface Props {
  type: "signIn" | "signUp";
}
export default function AuthCard({ type }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/mypage");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  const handleLogIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/mypage");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  switch (type) {
    case "signIn":
      return (
        <AuthForm title="ログイン">
          <div className={styles.form}>
            <label>メールアドレス</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.form}>
            <label>パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button color="primary" text="ログイン" onClickAction={handleLogIn} />
          <Link href={"./signup"}>
            <p className={styles.linkText}>新規登録</p>
          </Link>
        </AuthForm>
      );
    case "signUp":
      return (
        <AuthForm title="新規登録">
          <div className={styles.form}>
            <label>メールアドレス</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.form}>
            <label>パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            color="primary"
            text="サインアップ"
            onClickAction={handleSignUp}
          />
          <Link href={"./"}>
            <p className={styles.linkText}>ログイン</p>
          </Link>
        </AuthForm>
      );
  }
}
