"use client";
import styles from "./page.module.css";
import { Button } from "@/components/Button";

export default function Home() {
  const handleClick = () => {
    console.log("Hello world");
  };
  return (
    <div className={styles.page}>
      <Button color="primary" text="ログイン" onClick={handleClick} />
    </div>
  );
}
