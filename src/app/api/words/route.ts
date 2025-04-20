import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { db } from "@/lib/firebase";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";

//firestoreに保存
export async function POST(req: NextRequest) {
  const { userId, dictId, name, discription } = await req.json();

  const wordsCollectionRef = collection(
    db,
    "users",
    userId,
    "dictionaries",
    dictId,
    "words"
  );
  await setDoc(doc(wordsCollectionRef), {
    name,
    discription,
    date: new Date(),
  });

  return NextResponse.json({ result: "success" });
}

//firestoreから取得
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  const dictId = req.nextUrl.searchParams.get("dictId");

  const snapshot = await adminDb
    .collection("users")
    .doc(userId!)
    .collection("dictionaries")
    .doc(dictId!)
    .collection("words")
    .orderBy("date", "desc")
    .get();

  const word = snapshot.empty
    ? []
    : snapshot.docs.map((doc) => ({
        wordId: doc.id,
        ...doc.data(),
      }));

  return NextResponse.json(word);
}

export async function DELETE(req: NextRequest) {
  const { userId, dictId, wordId } = await req.json();
  const wordCollectionRef = doc(
    db,
    "users",
    userId,
    "dictionaries",
    dictId,
    "words",
    wordId
  );

  await deleteDoc(wordCollectionRef);
  return NextResponse.json({ result: "success" });
}
