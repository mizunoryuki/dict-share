"use client";
import DictContainer from "@/components/DictContainer";
import Header from "@/components/Header";
import styles from "./page.module.css";
import { Button } from "@/components/Button";

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
  return (
    <div className={styles.container}>
      <Header />
      <DictContainer data={data} />
      <Button
        color="secondary"
        text="追加"
        onClickAction={() => console.log("add")}
      />
    </div>
  );
}
