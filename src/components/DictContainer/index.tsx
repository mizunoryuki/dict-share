"use client";
import DictCard from "../DictCard";
import styles from "./index.module.css";
import { useAtomValue } from "jotai";
import { dictListAtom } from "@/atoms/dictAtoms";

export default function DictContainer() {
  const dicts = useAtomValue(dictListAtom);
  if (dicts.length != 0) {
    return (
      <div className={styles.container}>
        {dicts.map((value, index) => {
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
