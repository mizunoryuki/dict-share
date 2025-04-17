import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { db } from "@/lib/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

//firestoreに保存
export async function POST(req: NextRequest) {
  const { userId, dictId, name, discription } = await req.json();

  const newElem = {
    name: name,
    discription: discription,
    createdAt: new Date(),
  };

  //firestoreのwordsに要素を追加
  await updateDoc(doc(db, "users", userId, "dictionaries", dictId), {
    words: arrayUnion(newElem),
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
    .orderBy("createdAt", "desc")
    .get();

  const dictionaries = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return NextResponse.json({ dictionaries });
}
