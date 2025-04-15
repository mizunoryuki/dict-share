import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DataWithUser } from "@/types/datatype";

//辞書を作成
export const createDictionary = async ({ title, user }: DataWithUser) => {
  console.log("createDictionary");
  if (!user) throw new Error("ログインしていません");

  await addDoc(collection(db, "users"), {
    title: title,
    ownerId: user.uid,
    createdAt: new Date(),
  });
};

//単語を作成
export const addWordToDictionary = async (
  dictionaryId: string,
  word: string,
  meaning: string
) => {
  const wordsCollection = collection(db, "dictionaries", dictionaryId, "words");
  await addDoc(wordsCollection, {
    word,
    meaning,
    createdAt: new Date(),
  });
};
