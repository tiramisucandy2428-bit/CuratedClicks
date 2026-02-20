import { NextResponse } from "next/server";
import { BLOG_CATEGORIES } from "@/app/lib/contentStore";
import { getFirebaseDb } from "@/lib/firebaseAdmin";

const BLOGS_COLLECTION = "blogs";

function normalizeBlog(doc) {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title || "Untitled Blog",
    excerpt: data.excerpt || "",
    blogUrl: data.blogUrl || "",
    category: BLOG_CATEGORIES.includes(data.category) ? data.category : "Seasonal",
    pinned: Boolean(data.pinned),
    createdAt: Number(data.createdAt) || Date.now(),
  };
}

export async function GET() {
  const db = getFirebaseDb();
  if (!db) {
    return NextResponse.json({ blogs: [], error: "Firebase is not configured." }, { status: 200 });
  }

  const snapshot = await db.collection(BLOGS_COLLECTION).get();
  const blogs = snapshot.docs
    .map((doc) => normalizeBlog(doc))
    .sort((first, second) => (second.createdAt || 0) - (first.createdAt || 0));

  return NextResponse.json({ blogs }, { status: 200 });
}
