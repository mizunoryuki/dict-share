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
      <h1>{data.dictName}</h1>
      <div className={styles.cardBox}>
        {isError ? (
          <p className={styles.message}>{errorText}</p>
        ) : (
          data.words.length >= 1 &&
          data.words.map((value, index) => {
            return <WordCard key={index} data={value} isHide={false} />;
          })
        )}
      </div>
    </div>
  );
}
