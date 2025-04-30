"use client";
import DictCard from "../DictCard";
import styles from "./index.module.css";
import { useAuth } from "@/context/AuthProvider";
import { useEffect, useState } from "react";
import { DictTitle } from "@/types/datatype";
import { useDictTitle } from "@/hooks/useDictTitle";

export default function DictContainer() {
  const { user } = useAuth();
  const { dicts, fetchDicts } = useDictTitle(user?.uid);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchDicts();
      setLoading(false);
    };
    fetchData();
  }, [fetchDicts]);

  return (
    <div className={styles.container}>
      {loading ? (
        <p className={styles.message}>読み込み中</p>
      ) : dicts.dictionaries.length >= 1 ? (
        dicts.dictionaries.map((value: DictTitle, index: number) => {
          return <DictCard dict={value} key={index} />;
        })
      ) : (
        <p className={styles.message}>辞書を作成しよう</p>
      )}
    </div>
  );
}
