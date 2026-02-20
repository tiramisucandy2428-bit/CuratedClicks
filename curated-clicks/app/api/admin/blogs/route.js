import { NextResponse } from "next/server";
import { BLOG_CATEGORIES } from "@/app/lib/contentStore";
import { isAdminRequestAuthenticated } from "@/lib/adminSession";
import { getFirebaseDb } from "@/lib/firebaseAdmin";

const BLOGS_COLLECTION = "blogs";

export async function POST(request) {
  if (!isAdminRequestAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const db = getFirebaseDb();
  if (!db) {
    return NextResponse.json({ error: "Firebase is not configured." }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const title = body?.title?.trim();
  const excerpt = body?.excerpt?.trim();
  const blogUrl = body?.blogUrl?.trim() || "";
  const category = BLOG_CATEGORIES.includes(body?.category) ? body.category : "Seasonal";
  const pinned = Boolean(body?.pinned);

  if (!title || !excerpt) {
    return NextResponse.json({ error: "Title and content are required." }, { status: 400 });
  }

  const createdAt = Date.now();
  const id = `b-${createdAt}`;

  await db.collection(BLOGS_COLLECTION).doc(id).set({
    title,
    excerpt,
    blogUrl,
    category,
    pinned,
    createdAt,
  });

  return NextResponse.json(
    {
      blog: {
        id,
        title,
        excerpt,
        blogUrl,
        category,
        pinned,
        createdAt,
      },
    },
    { status: 201 }
  );
}
