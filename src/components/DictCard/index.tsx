"use client";
import { DictInfo } from "@/types/datatype";
import { Button } from "../Button";
import styles from "./index.module.css";

interface Props {
  dict: DictInfo;
}

export default function DictCard({ dict }: Props) {
  return (
    <div className={styles.cardBox}>
      <p>{dict.title}</p>
      <div className={styles.cardButton}>
        <Button
          color="primary"
          text="閲覧"
          onClickAction={() => console.log(dict.id)}
        />
        <Button
          color="secondary"
          text="登録"
          onClickAction={() => console.log("登録")}
        />
      </div>
    </div>
  );
}
