import WordCard from "../WordCard";
import styles from "./index.module.css";
interface Props {
  data: {
    title: string;
    words: { name: string; discription: string }[];
  };
}

export default function WordContainer({ data }: Props) {
  if (data.words.length != 0) {
    return (
      <div className={styles.container}>
        {data.words.map((value, index) => {
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
        <p className={styles.message}>辞書を作成しよう</p>
      </div>
    );
  }
}
