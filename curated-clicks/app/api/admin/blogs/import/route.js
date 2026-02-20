import { NextResponse } from "next/server";
import { BLOG_CATEGORIES } from "@/app/lib/contentStore";
import { isAdminRequestAuthenticated } from "@/lib/adminSession";
import { getFirebaseDb } from "@/lib/firebaseAdmin";

const BLOGS_COLLECTION = "blogs";

function normalizeBlog(raw, index) {
  const createdAt = Number(raw?.createdAt) || Date.now() + index;
  return {
    id: raw?.id || `b-${createdAt}`,
    title: raw?.title || "Untitled Blog",
    excerpt: raw?.excerpt || "",
    blogUrl: raw?.blogUrl || "",
    category: BLOG_CATEGORIES.includes(raw?.category) ? raw.category : "Seasonal",
    pinned: Boolean(raw?.pinned),
    createdAt,
  };
}

export async function POST(request) {
  if (!isAdminRequestAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const db = getFirebaseDb();
  if (!db) {
    return NextResponse.json({ error: "Firebase is not configured." }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const inputBlogs = Array.isArray(body?.blogs) ? body.blogs : null;

  if (!inputBlogs) {
    return NextResponse.json({ error: "Invalid backup payload." }, { status: 400 });
  }

  const blogs = inputBlogs.map((item, index) => normalizeBlog(item, index));
  const batch = db.batch();

  blogs.forEach((blog) => {
    const ref = db.collection(BLOGS_COLLECTION).doc(blog.id);
    batch.set(ref, {
      title: blog.title,
      excerpt: blog.excerpt,
      blogUrl: blog.blogUrl,
      category: blog.category,
      pinned: blog.pinned,
      createdAt: blog.createdAt,
    });
  });

  await batch.commit();
  return NextResponse.json({ ok: true, count: blogs.length }, { status: 200 });
}
