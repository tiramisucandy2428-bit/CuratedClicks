import { NextResponse } from "next/server";
import { isAdminRequestAuthenticated } from "@/lib/adminSession";
import { getFirebaseDb } from "@/lib/firebaseAdmin";

const BLOGS_COLLECTION = "blogs";

export async function DELETE(request, { params }) {
  if (!isAdminRequestAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const db = getFirebaseDb();
  if (!db) {
    return NextResponse.json({ error: "Firebase is not configured." }, { status: 500 });
  }

  const id = params?.id;
  if (!id) {
    return NextResponse.json({ error: "Blog id is required." }, { status: 400 });
  }

  await db.collection(BLOGS_COLLECTION).doc(id).delete();
  return NextResponse.json({ ok: true }, { status: 200 });
}
