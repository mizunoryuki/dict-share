"use client";
import { useState } from "react";
import { AuthForm } from "../AuthForm";
import styles from "./index.module.css";
import { Button } from "../Button";
import Link from "next/link";

interface Props {
  type: "signIn" | "signUp" | "signOut";
}
export default function AuthCard({ type = "signIn" }: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  switch (type) {
    case "signIn":
      return (
        <AuthForm title="ログイン">
          <div className={styles.form}>
            <label>メールアドレス</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className={styles.form}>
            <label>パスワード</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            color="primary"
            text="ログイン"
            onClickAction={() => console.log("login")}
          />
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
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className={styles.form}>
            <label>パスワード</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            color="primary"
            text="ログイン"
            onClickAction={() => console.log("login")}
          />
        </AuthForm>
      );
    case "signOut":
  }
}
