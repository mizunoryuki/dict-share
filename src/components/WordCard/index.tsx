"use client";
import Image from "next/image";
import styles from "./index.module.css";
import { Word } from "@/types/datatype";
import { useAuth } from "@/context/AuthProvider";
interface Props {
  data: Word;
  isHide?: boolean;
  dictId: string;
  deleteFuncAction?: () => void;
}
export default function WordCard({
  data,
  dictId,
  isHide = true,
  deleteFuncAction,
}: Props) {
  const { user } = useAuth();
  const handleDelete = async () => {
    if (!user || !data.wordId || !deleteFuncAction) {
      console.log(user?.uid, dictId, data.wordId);
      return;
    }
    try {
      const response = await fetch(`/api/words`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          dictId: dictId,
          wordId: data.wordId,
        }),
      });

      if (!response.ok) {
        const resText = await response.text();
        console.error(response.status, resText);
        return;
      } else {
        deleteFuncAction();
        console.log("delete");
      }
    } catch (e) {
      console.error("failed to delete word.", e);
    }
  };

  return (
    <div className={styles.wordContainer}>
      <div className={styles.nameBox}>
        <p className={styles.wordName}>{data.name}</p>
        {isHide && (
          <div className={styles.iconBox}>
            <Image
              src={"../closeImage.svg"}
              alt="edit"
              width={30}
              height={30}
              onClick={handleDelete}
            />
          </div>
        )}
      </div>
      <div className={styles.wordDisc}>{data.discription}</div>
    </div>
  );
}
