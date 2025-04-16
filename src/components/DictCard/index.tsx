"use client";
import { DictInfo } from "@/types/datatype";
import { Button } from "../Button";
import styles from "./index.module.css";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { changeChooseAtom } from "@/atoms/dictAtoms";

interface Props {
  dict: DictInfo;
}

export default function DictCard({ dict }: Props) {
  const [, changeChoose] = useAtom(changeChooseAtom);
  const router = useRouter();

  const handleChooseDict = () => {
    changeChoose(dict);
    console.log("set dict");
    router.push(`/mypage/${dict.id}`);
  };

  return (
    <div className={styles.cardBox}>
      <p>{dict.title}</p>
      <div className={styles.cardButton}>
        <Button color="primary" text="閲覧" onClickAction={handleChooseDict} />
        <Button
          color="secondary"
          text="登録"
          onClickAction={() => console.log("登録")}
        />
      </div>
    </div>
  );
}
