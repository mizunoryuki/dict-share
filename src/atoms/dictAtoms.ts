import { DictInfo } from "@/types/datatype";
import { atom } from "jotai";

export const dictListAtom = atom<DictInfo[]>([]);

export const fetchDictsAtom = atom(null, async (get, set) => {
  const res = await fetch("/api/dictionaries");
  const data = await res.json();
  set(dictListAtom, data.dictionaries);
});
