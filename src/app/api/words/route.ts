import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { db } from "@/lib/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

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
  const docRef = doc(wordsCollectionRef);
  await setDoc(docRef, {
    wordId: docRef.id,
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

  const dictionaries = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log(dictionaries);

  return NextResponse.json({ dictionaries });
}
