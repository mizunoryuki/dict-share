"use client";
import { Button } from "@/components/Button";
import Header from "@/components/Header";
import styles from "../page.module.css";
import WordContainer from "@/components/WordContainer";
import { useState } from "react";
import WordModal from "@/components/WordModal";
import { useRouter } from "next/navigation";

export default function DictInfo() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Header />
      <WordContainer />
      <div>
        <Button
          color="primary"
          text="戻る"
          onClickAction={() => router.push("/mypage")}
        />
        <Button
          color="secondary"
          text="追加"
          onClickAction={() => setIsOpenModal(true)}
        />
      </div>
      <WordModal isOpen={isOpenModal} setIsOpenAction={setIsOpenModal} />
    </div>
  );
}
