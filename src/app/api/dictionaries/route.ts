import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

//firestoreに保存
export async function POST(req: NextRequest) {
  const { userId, title } = await req.json();

  const docRef = await adminDb
    .collection("users")
    .doc(userId)
    .collection("dictionaries")
    .add({
      title,
      date: new Date(),
      isPublic: false,
    });

  //idも保存
  await docRef.update({
    id: docRef.id,
  });

  return NextResponse.json({ result: "success" });
}

//firestoreから取得
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  const snapshot = await adminDb
    .collection("users")
    .doc(userId!)
    .collection("dictionaries")
    .orderBy("date", "desc")
    .get();

  const dictionaries = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return NextResponse.json({ dictionaries });
}

export async function DELETE(req: NextRequest) {
  const { userId, dictId } = await req.json();

  await adminDb
    .collection("users")
    .doc(userId)
    .collection("dictionaries")
    .doc(dictId)
    .delete();

  return NextResponse.json({ result: "success" });
}
