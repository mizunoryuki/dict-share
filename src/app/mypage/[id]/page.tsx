"use client";
import { Button } from "@/components/Button";
import Header from "@/components/Header";
import styles from "../page.module.css";
import WordContainer from "@/components/WordContainer";
import { useState } from "react";
import WordModal from "@/components/WordModal";
import { useRouter } from "next/navigation";
import ShareModal from "@/components/ShareModal";

export default function DictInfo() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenShareModal, setIsOpenShareModal] = useState<boolean>(false);
  const router = useRouter();

  const handleBackpage = () => {
    router.push("/mypage");
  };
  return (
    <div className={styles.container}>
      <Header />
      <WordContainer setIsOpenAction={setIsOpenShareModal} />
      <div>
        <Button color="primary" text="戻る" onClickAction={handleBackpage} />
        <Button
          color="secondary"
          text="追加"
          onClickAction={() => setIsOpenModal(true)}
        />
      </div>
      <WordModal isOpen={isOpenModal} setIsOpenAction={setIsOpenModal} />
      <ShareModal
        isOpen={isOpenShareModal}
        setIsOpenAction={setIsOpenShareModal}
      />
    </div>
  );
}
