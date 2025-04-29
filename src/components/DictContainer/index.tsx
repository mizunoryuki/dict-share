"use client";
import DictCard from "../DictCard";
import styles from "./index.module.css";
import { useAuth } from "@/context/AuthProvider";
import { useEffect } from "react";
import { DictTitle } from "@/types/datatype";
import { useDictTitle } from "@/hooks/useDictTitle";

export default function DictContainer() {
  const { user } = useAuth();
  const { dicts, fetchDicts } = useDictTitle(user?.uid);

  useEffect(() => {
    fetchDicts();
  }, [fetchDicts]);

  return (
    <div className={styles.container}>
      {dicts.dictionaries.length >= 1 ? (
        dicts.dictionaries.map((value: DictTitle, index: number) => {
          return <DictCard dict={value} key={index} />;
        })
      ) : (
        <p className={styles.message}>辞書を作成しよう</p>
      )}
    </div>
  );
}
