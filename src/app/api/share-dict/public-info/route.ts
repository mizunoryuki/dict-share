import { adminDb } from "@/lib/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    const dictId = req.nextUrl.searchParams.get("dictId");
    console.log(userId, dictId);
    if (!userId || !dictId) {
      return NextResponse.json({
        error: "userId or dictid not found",
      });
    }

    const docRef = adminDb
      .collection("users")
      .doc(userId)
      .collection("dictionaries")
      .doc(dictId);
    const docSnap = await docRef.get();
    if (!docSnap.exists || !docSnap.data()) {
      return NextResponse.json({
        error: "data not found",
      });
    }

    const data = docSnap.data();
    if (!data || typeof data.isPublic !== "boolean") {
      return NextResponse.json(
        {
          error: "invalid dictionary data",
        },
        { status: 400 }
      );
    }
    const flag = docSnap.data()?.isPublic;

    return NextResponse.json({
      result: flag,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}

//公開設定の変更
export async function POST(req: NextRequest) {
  try {
    const { userId, dictId } = await req.json();

    if (!userId || !dictId) {
      return NextResponse.json({
        error: "userid or dictid not found",
      });
    }

    const docRef = adminDb
      .collection("users")
      .doc(userId)
      .collection("dictionaries")
      .doc(dictId);

    const docSnap = await docRef.get();

    if (!docSnap.exists || !docSnap.data()) {
      return NextResponse.json(
        { error: "cannot get dict information" },
        { status: 404 }
      );
    }

    const data = docSnap.data();
    if (!data || typeof data.isPublic !== "boolean") {
      return NextResponse.json(
        { error: "invalid dictionary data" },
        { status: 400 }
      );
    }
    //isPublicを反転する
    await docRef.update({
      isPublic: !data.isPublic,
    });

    return NextResponse.json(
      {
        result: "successfuly update dictionary infomation",
      },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
