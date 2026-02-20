import { NextResponse } from "next/server";
import { BLOG_CATEGORIES } from "@/app/lib/contentStore";
import { getFirebaseDb } from "@/lib/firebaseAdmin";

const BLOGS_COLLECTION = "blogs";

async function resolveIdFromParams(paramsOrPromise) {
  const params = await paramsOrPromise;
  const value = params?.id;
  if (Array.isArray(value)) {
    return value[0] || "";
  }
  return value || "";
}

function normalizeBlog(id, data) {
  return {
    id,
    title: data.title || "Untitled Blog",
    excerpt: data.excerpt || "",
    blogUrl: data.blogUrl || "",
    category: BLOG_CATEGORIES.includes(data.category) ? data.category : "Seasonal",
    pinned: Boolean(data.pinned),
    createdAt: Number(data.createdAt) || Date.now(),
  };
}

export async function GET(_request, { params }) {
  const db = getFirebaseDb();
  if (!db) {
    return NextResponse.json({ error: "Firebase is not configured." }, { status: 500 });
  }

  const id = await resolveIdFromParams(params);
  if (!id) {
    return NextResponse.json({ error: "Blog id is required." }, { status: 400 });
  }

  const doc = await db.collection(BLOGS_COLLECTION).doc(id).get();
  if (!doc.exists) {
    return NextResponse.json({ error: "Blog not found." }, { status: 404 });
  }

  return NextResponse.json({ blog: normalizeBlog(doc.id, doc.data()) }, { status: 200 });
}
