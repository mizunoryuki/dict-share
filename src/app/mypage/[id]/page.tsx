"use client";
import { Button } from "@/components/Button";
import Header from "@/components/Header";
import styles from "../page.module.css";
import WordContainer from "@/components/WordContainer";
import { useState } from "react";

export default function DictInfo() {
	const [isOpenModal,setIsOpenModal] = useState(false)
  return (
    <div className={styles.container}>
      <Header />
      <WordContainer />
      <Button
        color="secondary"
        text="追加"
        onClickAction={() => setIsOpenModal(true)}
      />
    </div>
  );
}
