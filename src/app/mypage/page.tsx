"use client";
import DictContainer from "@/components/DictContainer";
import Header from "@/components/Header";
import styles from "./page.module.css";
import { Button } from "@/components/Button";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const data = [
  {
    title: "東京てうsとてすとておあいfじゃおfjへおf；hじゃいfじゃ；おふぃあ",
  },
  {
    title: "英語",
  },
  {
    title: "東京てうsとてすとておあいfじゃおfjへおf；hじゃいfじゃ；おふぃあ",
  },
  {
    title: "英語",
  },
];

export default function Mypage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className={styles.containerRedirect}>
        <p className={styles.message}>読み込み中</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <div className={styles.container}>
        <Header />
        <DictContainer data={data} />
        <Button
          color="secondary"
          text="追加"
          onClickAction={() => console.log("add")}
        />
      </div>
    </>
  );
}
