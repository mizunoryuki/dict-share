import { DictInfo } from "@/types/datatype";
import { atom } from "jotai";

export const dictListAtom = atom<DictInfo[]>([]);

export const fetchDictsAtom = atom(null, async (_get, set, userId: string) => {
  const res = await fetch(`/api/dictionaries?userId=${userId}`);
  const data = await res.json();
  set(dictListAtom, data.dictionaries);
});
