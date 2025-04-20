import { Word } from "@/types/datatype";
import { atom } from "jotai";

import { DictTitle } from "@/types/datatype";
export const dictListAtom = atom<DictTitle[]>([]);

//辞書情報のアップデート
export const fetchDictsAtom = atom(null, async (_get, set, userId: string) => {
  const res = await fetch(`/api/dictionaries?userId=${userId}`);
  const data = await res.json();
  set(dictListAtom, data.dictionaries);
});

//選択した辞書の情報
export const chooseDictAtom = atom<DictTitle>({ id: "", title: "" });
//選択した辞書の単語
export const chooseDictWordsAtom = atom<Word[]>([]);

//開く辞書の情報をセット
export const changeChooseAtom = atom(null, (_get, set, data: DictTitle) => {
  const { id, title } = data;
  set(chooseDictAtom, { id, title }); //選択している辞書の情報更新
});

//選択した情報を取得
export const fetchWordsAtom = atom(null, async (_get, set, userId, dictId) => {
  const res = await fetch(`/api/words?userId=${userId}&dictId=${dictId}`);
  const data = await res.json();
  set(chooseDictWordsAtom, data);
});
