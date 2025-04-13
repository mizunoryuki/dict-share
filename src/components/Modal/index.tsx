"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../Button";
import styles from "./index.module.css";
import { createDictionary } from "@/utils/createData";

interface Props {
  isOpen: boolean;
  setIsOpenAction: Dispatch<SetStateAction<boolean>>;
}
export default function Modal({ isOpen, setIsOpenAction }: Props) {
  const [title, setTitle] = useState<string>("");
  if (!isOpen) return null;

  const handleClose = () => {
    setIsOpenAction(false);
  };

  const handleClick = async () => {
    setIsOpenAction(false);
    //DBに辞書(名前:title)を追加
    await createDictionary(title);
  };

  if (isOpen) {
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
            <Button
              color="secondary"
              text="やめる"
              onClickAction={handleClose}
            />
            <Button color="primary" text="つくる" onClickAction={handleClick} />
          </div>
        </div>
      </div>
    );
  }
}
