"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../Button";
import styles from "./index.module.css";
import { useAuth } from "@/context/AuthProvider";
import {
  changeChooseAtom,
  chooseDictAtom,
  dictListAtom,
  fetchDictsAtom,
} from "@/atoms/dictAtoms";
import { useAtom, useAtomValue } from "jotai";
import "./index.module.css";
import searchDicts from "@/utils/searchDict";

interface Props {
  isOpen: boolean;
  setIsOpenAction: Dispatch<SetStateAction<boolean>>;
}
export default function WordModal({ isOpen, setIsOpenAction }: Props) {
  const { user } = useAuth();
  const [name, setName] = useState<string>("");
  const [disc, setDisc] = useState<string>("");
  const chooseDict = useAtomValue(chooseDictAtom);
  const dictList = useAtomValue(dictListAtom);
  const [, fetchDicts] = useAtom(fetchDictsAtom);
  const [, fetchChooseDict] = useAtom(changeChooseAtom);

  useEffect(() => {
    fetchChooseDict(searchDicts(dictList, chooseDict.id));
  }, [chooseDict.id, dictList, fetchChooseDict]);

  const closeModal = () => setIsOpenAction(false);
  const handleClose = () => {
    closeModal();
  };

  const handleClick = async () => {
    if (!user) {
      console.log("You are not logged in.");
      return;
    }

    if (!name || !disc) {
      alert("テキストを記入してください");
      return;
    }
    closeModal();

    try {
      //dictIdの辞書に単語追加
      const response = await fetch(`/api/words`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          dictId: chooseDict.id,
          name,
          discription: disc,
        }),
      });

      if (!response.ok) {
        const resText = await response.text();
        console.error(response.status, resText);
        return;
      }
      await fetchDicts(user.uid);
    } catch (e) {
      console.error("failed to fetch data.", e);
    } finally {
      setName("");
      setDisc("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>単語を追加</h2>
        <div className={styles.inputBox}>
          <div className={styles.content}>
            <label>単語名</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="apple"
            />
          </div>
          <div className={styles.content}>
            <label>説明・意味</label>
            <textarea
              value={disc}
              onChange={(e) => setDisc(e.target.value)}
              placeholder="赤い"
            />
          </div>
        </div>
        <div className={styles.buttonBox}>
          <Button color="secondary" text="やめる" onClickAction={handleClose} />
          <Button color="primary" text="つくる" onClickAction={handleClick} />
        </div>
      </div>
    </div>
  );
}
