import { adminDb } from "@/lib/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    const dictId = req.nextUrl.searchParams.get("dictId");

    if (!userId || !dictId) {
      return NextResponse.json(
        { error: "userId or dictId not found" },
        { status: 400 }
      );
    }

    const dictRef = adminDb
      .collection("users")
      .doc(userId)
      .collection("dictionaries")
      .doc(dictId);

    const dictSnap = await dictRef.get();
    if (!dictSnap.exists || !dictSnap.data()) {
      return NextResponse.json(
        { error: "dictionary not found" },
        { status: 404 }
      );
    }

    const dictData = dictSnap.data();
    if (!dictData) {
      return NextResponse.json(
        { error: "invalid dictionary data" },
        { status: 400 }
      );
    }

    const wordsRef = dictRef.collection("words");
    const wordsSnap = await wordsRef.orderBy("date", "desc").get();

    const words = wordsSnap.docs.map((doc) => ({
      wordId: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      dictName: dictData.title || "",
      words,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
