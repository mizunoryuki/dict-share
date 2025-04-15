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
  if (!isOpen) return null;

  const handleClose = () => {
    setIsOpenAction(false);
  };

  const handleClick = async () => {
    setIsOpenAction(false);
    if (user) {
      const userId = user.uid;
      //DBに辞書(名前:title)を追加
      const response = await fetch("/api/dictionaries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          userId,
          words: [],
        }),
      });

      if (!response.ok) {
        console.error("APIエラー", response);
        return;
      } else {
        try {
          await fetchDicts(userId);
        } catch (e) {
          console.error("辞書の取得に失敗しました", e);
        }
      }
    } else {
      console.log("ログインできていません");
    }
    setTitle("");
  };

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
