"use client";
import DictCard from "../DictCard";
import styles from "./index.module.css";
import { useAtom, useAtomValue } from "jotai";
import { dictListAtom, fetchDictsAtom } from "@/atoms/dictAtoms";
import { useAuth } from "@/context/AuthProvider";
import { useEffect } from "react";
import { DictTitle } from "@/types/datatype";

export default function DictContainer() {
  const { user } = useAuth();
  const dicts = useAtomValue(dictListAtom);
  const [, fetchDicts] = useAtom(fetchDictsAtom);

  useEffect(() => {
    if (user) {
      fetchDicts(user.uid);
    }
  }, [fetchDicts, user]);

  return (
    <div className={styles.container}>
      {dicts.length !== 0 ? (
        dicts.map((value: DictTitle, index: number) => {
          return <DictCard dict={value} key={index} />;
        })
      ) : (
        <p className={styles.message}>辞書を作成しよう</p>
      )}
    </div>
  );
}
