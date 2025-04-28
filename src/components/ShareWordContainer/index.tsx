import WordCard from "../WordCard";
import styles from "./index.module.css";

interface Props {
  data: {
    dictName: string;
    words: {
      name: string;
      discription: string;
      wordId: string;
      date: Date;
    }[];
  };
}

export default function ShareWordContainer({ data }: Props) {
  return (
    <div className={styles.container}>
      <h2>{data.dictName}</h2>
      <div className={styles.cardBox}>
        {data.words.length >= 1 ? (
          data.words.map((value, index) => {
            return <WordCard key={index} data={value} isHide={false} />;
          })
        ) : (
          <p className={styles.message}>単語を追加しよう</p>
        )}
      </div>
    </div>
  );
}
