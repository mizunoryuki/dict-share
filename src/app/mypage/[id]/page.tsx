"use client";
import { Button } from "@/components/Button";
import DictContainer from "@/components/DictContainer";
import Header from "@/components/Header";
import styles from "../page.module.css";
import WordCard from "@/components/WordCard";

interface Word {
  name: string;
  discription: string;
}

interface Props {
  title: string;
  words: Word[];
}

const data: Props = {
  title: "東京特許許可局",
  words: [
    {
      name: "DOOM",
      discription: "社会に絶望したニート",
    },
  ],
};

export default function DictInfo({ title, words }: Props) {
  return (
    <div className={styles.container}>
      <Header />
      <div>
        {data.words.map((value, index) => {
          return (
            <WordCard
              name={value.name}
              discription={value.discription}
              key={index}
            />
          );
        })}
      </div>
      <Button
        color="secondary"
        text="追加"
        onClickAction={() => console.log("add")}
      />
    </div>
  );
}
