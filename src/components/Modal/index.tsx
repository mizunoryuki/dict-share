"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../Button";
import styles from "./index.module.css";
import { useAuth } from "@/context/AuthProvider";
import { fetchDictsAtom } from "@/atoms/dictAtoms";
import { useAtom } from "jotai";

interface Props {
  isOpen: boolean;
  setIsOpenAction: Dispatch<SetStateAction<boolean>>;
}
export default function Modal({ isOpen, setIsOpenAction }: Props) {
  const { user } = useAuth();
  const [title, setTitle] = useState<string>("");
  const [, fetchDicts] = useAtom(fetchDictsAtom);

  const closeModal = () => setIsOpenAction(false);
  const handleClose = () => {
    closeModal();
  };

  const handleClick = async () => {
    if (!user) {
      console.log("You are not logged in.");
      return;
    }

    if (!title) {
      alert("テキストを記入してください");
      return;
    }
    closeModal();

    try {
      const response = await fetch("/api/dictionaries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          userId: user.uid,
          words: [],
        }),
      });

      if (!response.ok) {
        const resText = await response.text();
        console.error(response.status, resText);
        return;
      }
      await fetchDicts(user.uid);
    } catch (e) {
      console.error("failed to fetch data.", e);
    } finally {
      setTitle("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>辞書を作成</h2>
        <div className={styles.content}>
          <label>辞書の名前</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.buttonBox}>
          <Button color="secondary" text="やめる" onClickAction={handleClose} />
          <Button color="primary" text="つくる" onClickAction={handleClick} />
        </div>
      </div>
    </div>
  );
}
