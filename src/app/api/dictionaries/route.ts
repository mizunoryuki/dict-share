import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

//firestoreに保存
export async function POST(req: NextRequest) {
  const { userId, title } = await req.json();

  await adminDb.collection("users").doc(userId).collection("dictionaries").add({
    title,
    date: new Date(),
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
