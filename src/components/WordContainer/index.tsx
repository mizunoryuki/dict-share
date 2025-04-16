import { useAtomValue } from "jotai";
import WordCard from "../WordCard";
import styles from "./index.module.css";
import { chooseDictAtom } from "@/atoms/dictAtoms";

export default function WordContainer() {
  const chooseDict = useAtomValue(chooseDictAtom);
  if (chooseDict.words.length != 0) {
    return (
      <div className={styles.container}>
        {chooseDict.words.map((value, index) => {
          return (
            <WordCard
              key={index}
              name={value.name}
              discription={value.discription}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <p className={styles.message}>単語を追加しよう</p>
      </div>
    );
  }
}
