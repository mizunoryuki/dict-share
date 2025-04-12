"use client";
import { Button } from "../Button";
import Image from "next/image";
import styles from "./index.module.css";

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.title}>
        <Image src={"../titleImage.svg"} alt="title" width={30} height={30} />
        <h1>share-dict</h1>
      </div>
      <Button
        color="secondary"
        text="Logout"
        onClickAction={() => console.log("logout")}
      />
    </div>
  );
}
