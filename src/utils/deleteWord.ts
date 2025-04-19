import { DictInfo } from "@/types/datatype";

/**
 * @param {DictInfo[]} data - 配列
 * @param {number} index - インデックス
 *
 *
 *
 */

export default function DeleteWord(data: DictInfo[], id: number) {
  data.filter((value, index) => index !== id);
  console.log(data);
}
