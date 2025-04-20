"use client";
import { DictTitle } from "@/types/datatype";
import { Button } from "../Button";
import styles from "./index.module.css";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { changeChooseAtom, fetchDictsAtom } from "@/atoms/dictAtoms";
import { useAuth } from "@/context/AuthProvider";

interface Props {
  dict: DictTitle;
}

export default function DictCard({ dict }: Props) {
  const [, changeChoose] = useAtom(changeChooseAtom);
  const { user } = useAuth();
  const [, fetchDicts] = useAtom(fetchDictsAtom);
  const router = useRouter();

  const handleChooseDict = () => {
    changeChoose(dict);
    router.push(`/mypage/${dict.id}`);
  };

  const handleDeleteDict = async () => {
    if (!user || !dict) {
      return;
    }

    try {
      const response = await fetch(`/api/dictionaries`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          dictId: dict.id,
        }),
      });

      if (!response.ok) {
        const resText = await response.text();
        console.error(response.status, resText);
        return;
      }
      await fetchDicts(user.uid);
    } catch (e) {
      console.error("failed to delete dict.", e);
    }
  };

  return (
    <div className={styles.cardBox}>
      <p>{dict.title}</p>
      <div className={styles.cardButton}>
        <Button color="primary" text="閲覧" onClickAction={handleChooseDict} />
        <Button
          color="secondary"
          text="削除"
          onClickAction={handleDeleteDict}
        />
      </div>
    </div>
  );
}
