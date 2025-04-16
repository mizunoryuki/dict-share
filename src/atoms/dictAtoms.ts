import { DictInfo } from "@/types/datatype";
import { atom } from "jotai";

export const dictListAtom = atom<DictInfo[]>([]);

export const fetchDictsAtom = atom(null, async (_get, set, userId: string) => {
  const res = await fetch(`/api/dictionaries?userId=${userId}`);
  const data = await res.json();
  set(dictListAtom, data.dictionaries);
});

export const chooseDictAtom = atom<DictInfo>({ id: "", title: "", words: [] });

//開く辞書の情報をセット
export const changeChooseAtom = atom(null, (_get, set, data: DictInfo) => {
  const { id, title, words } = data;
  console.log(id, title, words);
  set(chooseDictAtom, { id, title, words });
});
