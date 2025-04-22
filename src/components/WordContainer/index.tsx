import { useAtom, useAtomValue } from "jotai";
import WordCard from "../WordCard";
import styles from "./index.module.css";
import {
  chooseDictAtom,
  chooseDictWordsAtom,
  fetchWordsAtom,
} from "@/atoms/dictAtoms";
import ContainerHeader from "../ContainerHeader";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";

export default function WordContainer() {
  const { user } = useAuth();
  const chooseDict = useAtomValue(chooseDictAtom);
  const chooseDictWords = useAtomValue(chooseDictWordsAtom);
  const [, fetchWords] = useAtom(fetchWordsAtom);

  useEffect(() => {
    //単語取得
    if (user && chooseDict.id) {
      fetchWords(user.uid, chooseDict.id);
    }
  }, [chooseDict.id, fetchWords, user]);
  return (
    <div className={styles.container}>
      <ContainerHeader title={chooseDict.title} dictId={chooseDict.id} />
      <div className={styles.cardBox}>
        {chooseDictWords.length >= 1 ? (
          chooseDictWords.map((value, index) => {
            return <WordCard key={index} data={value} />;
          })
        ) : (
          <p className={styles.message}>単語を追加しよう</p>
        )}
      </div>
    </div>
  );
}
