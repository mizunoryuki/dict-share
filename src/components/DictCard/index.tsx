"use client";
import { Button } from "../Button";
import styles from "./index.module.css";

interface Props {
  title: string;
}
export default function DictCard({ title }: Props) {
  return (
    <div className={styles.cardBox}>
      <p>{title}</p>
      <div className={styles.cardButton}>
        <Button
          color="primary"
          text="閲覧"
          onClickAction={() => console.log("閲覧")}
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
