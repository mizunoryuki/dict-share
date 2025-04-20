import { DictTitle } from "@/types/datatype";

/**
 * 辞書IDから辞書情報を取得する関数
 * @param {DictTitle[]} data - 辞書情報
 * @param {string} id - 辞書ID
 * @returns {DictInfo} filterdArray - 辞書IDから特定の辞書の情報を抜き取ったもの
 */
export default function searchDicts(data: DictTitle[], id: string) {
  const filterdArray = data.filter((item) => item.id === id); //１要素だけ取得
  return filterdArray[0];
}
