import { Word } from "@/types/datatype";
import { atom } from "jotai";

import { DictTitle } from "@/types/datatype";
export const dictListAtom = atom<DictTitle[]>([]);

export const fetchDictsAtom = atom(null, async (_get, set, userId: string) => {
  const res = await fetch(`/api/dictionaries?userId=${userId}`);
  const data = await res.json();
  set(dictListAtom, data.dictionaries);
});

export const chooseDictAtom = atom<DictTitle>({ id: "", title: "" });

export const chooseDictWordsAtom = atom<Word[]>([]);

export const changeChooseAtom = atom(null, (_get, set, data: DictTitle) => {
  const { id, title } = data;
  set(chooseDictAtom, { id, title });
});

export const fetchWordsAtom = atom(null, async (_get, set, userId, dictId) => {
  const res = await fetch(`/api/words?userId=${userId}&dictId=${dictId}`);
  const data = await res.json();
  set(chooseDictWordsAtom, data);
});
