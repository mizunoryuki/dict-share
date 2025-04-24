import { adminDb } from "@/lib/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const dictId = req.nextUrl.searchParams.get("dictId");

  if (!dictId) {
    return NextResponse.json({ error: "dictId not found" }, { status: 400 });
  }

  try {
    const snapshot = await adminDb
      .collectionGroup("dictionaries")
      .where("id", "==", dictId)
      .where("isPublic", "==", true)
      .get();

    if (snapshot.empty) {
      return NextResponse.json(
        { error: "dictionary not found or not public" },
        { status: 404 }
      );
    }
    const doc = snapshot.docs[0];
    console.log(doc.data());
    const wordsSnapshot = await doc.ref.collection("words").get();

    const words = wordsSnapshot.docs.map((value) => ({
      name: value.data().name,
      discription: value.data().discription,
    }));
    console.log(words);

    return NextResponse.json({
      dictName: doc.data().title,
      words: words,
    });
  } catch (error) {
    console.error("GET /api/share-dict error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
