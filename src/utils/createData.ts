import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

//辞書を作成
export const createDictionary = async (name: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("ログインしていません");

  await addDoc(collection(db, "dictionaries"), {
    title: name,
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
