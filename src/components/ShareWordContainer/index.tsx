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
  isError: boolean;
  errorText: string;
}

export default function ShareWordContainer({
  data,
  isError,
  errorText,
}: Props) {
  return (
    <div className={styles.container}>
      <h2>{data.dictName}</h2>
      <div className={styles.cardBox}>
        {isError ? (
          <p className={styles.message}>{errorText}</p>
        ) : data.words.length >= 1 ? (
          data.words.map((value, index) => {
            return <WordCard key={index} data={value} isHide={false} />;
          })
        ) : (
          <p className={styles.message}>単語が追加されていません</p>
        )}
      </div>
    </div>
  );
}
