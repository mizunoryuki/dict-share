"use client";
import Image from "next/image";
import styles from "./index.module.css";
import { Word } from "@/types/datatype";
import { useAuth } from "@/context/AuthProvider";
import { chooseDictAtom, fetchWordsAtom } from "@/atoms/dictAtoms";
import { useAtom, useAtomValue } from "jotai";
interface Props {
  data: Word;
}
export default function WordCard({ data }: Props) {
  const { user } = useAuth();
  const chooseDict = useAtomValue(chooseDictAtom);
  const [, fetchWords] = useAtom(fetchWordsAtom);
  const handleDelete = async () => {
    if (!user || !chooseDict || !data.wordId) {
      console.log(user?.uid, chooseDict.id, data.wordId);
      return;
    }
    try {
      const response = await fetch(`/api/words`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          dictId: chooseDict.id,
          wordId: data.wordId,
        }),
      });

      if (!response.ok) {
        const resText = await response.text();
        console.error(response.status, resText);
        return;
      }
      await fetchWords(user.uid, chooseDict.id);
    } catch (e) {
      console.error("failed to delete word.", e);
    }
  };

  return (
    <div className={styles.wordContainer}>
      <div className={styles.nameBox}>
        <p className={styles.wordName}>{data.name}</p>
        <div className={styles.iconBox}>
          <Image
            src={"../closeImage.svg"}
            alt="edit"
            width={30}
            height={30}
            onClick={handleDelete}
          />
        </div>
      </div>
      <div className={styles.wordDisc}>{data.discription}</div>
    </div>
  );
}
