"use client";
import DictCard from "../DictCard";
import styles from "./index.module.css";
interface DataInfo {
  title: string;
}
interface Props {
  data: DataInfo[];
}

export default function DictContainer({ data = [] }: Props) {
  if (data.length != 0) {
    return (
      <div className={styles.container}>
        {data.map((value, index) => {
          return <DictCard title={value.title} key={index} />;
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
