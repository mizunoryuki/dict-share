import { useAtomValue } from "jotai";
import WordCard from "../WordCard";
import styles from "./index.module.css";
import { chooseDictAtom } from "@/atoms/dictAtoms";
import ContainerHeader from "../ContainerHeader";

export default function WordContainer() {
  const chooseDict = useAtomValue(chooseDictAtom);
  return (
    <div className={styles.container}>
      <ContainerHeader title={chooseDict.title} />
      <div className={styles.cardBox}>
        {chooseDict.words.length != 0 ? (
          chooseDict.words.map((value, index) => {
            return (
              <WordCard
                key={index}
                name={value.name}
                discription={value.discription}
              />
            );
          })
        ) : (
          <p className={styles.message}>単語を追加しよう</p>
        )}
      </div>
    </div>
  );
}
