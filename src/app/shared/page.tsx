"use client";
import { useEffect, useState } from "react";
import styles from "../page.module.css";
import { useSearchParams } from "next/navigation";
import { DictInfo } from "@/types/datatype";
import { useAuth } from "@/context/AuthProvider";

export default function SharePage() {
  const searchParams = useSearchParams();
  const dictId = searchParams.get("id");
  const { user } = useAuth();
  const [dictData, setDictData] = useState<DictInfo>({
    id: "",
    title: "",
    words: [],
  });

  useEffect(() => {
    if (dictId && user) {
      const fetchData = async (userId: string, dictId: string) => {
        //idから辞書情報をfetch
        //dictIdが存在しないものor共有を許可していない場合は弾く
        console.log(userId, dictId);
      };
      fetchData(user.uid, dictId);
    } else {
      return;
    }
  }, [dictId, user]);
  return <div className={styles.container}>{dictId}</div>;
}
