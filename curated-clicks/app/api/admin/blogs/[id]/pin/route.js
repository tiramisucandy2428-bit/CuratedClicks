import { NextResponse } from "next/server";
import { isAdminRequestAuthenticated } from "@/lib/adminSession";
import { getFirebaseDb } from "@/lib/firebaseAdmin";

const BLOGS_COLLECTION = "blogs";

export async function PATCH(request, { params }) {
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

  const body = await request.json().catch(() => null);
  if (typeof body?.pinned !== "boolean") {
    return NextResponse.json({ error: "Pinned flag is required." }, { status: 400 });
  }

  await db.collection(BLOGS_COLLECTION).doc(id).set({ pinned: body.pinned }, { merge: true });
  return NextResponse.json({ ok: true }, { status: 200 });
}
