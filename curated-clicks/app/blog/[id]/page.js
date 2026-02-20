"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { getBlogs } from "@/app/lib/contentStore";

const URL_REGEX = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;

const normalizeExternalUrl = (value) => {
  if (!value) return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

export default function BlogPostPage() {
  const params = useParams();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const load = () => setBlogs(getBlogs());
    load();

    const onStorage = () => load();
    const onContentUpdated = () => load();
    window.addEventListener("storage", onStorage);
    window.addEventListener("curated-clicks-content-updated", onContentUpdated);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("curated-clicks-content-updated", onContentUpdated);
    };
  }, []);

  const blog = useMemo(() => blogs.find((item) => item.id === params?.id), [blogs, params?.id]);

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Post link copied.");
    } catch {
      alert("Could not copy link.");
    }
  };

  const renderBlogTextWithLinks = (text) => {
    if (!text) return null;

    return text.split("\n").map((line, lineIndex) => {
      const tokens = line.split(URL_REGEX);

      return (
        <p key={`line-${lineIndex}`} className="mt-2 text-base leading-relaxed text-zinc-900">
          {tokens.map((token, tokenIndex) => {
            if (!token.match(URL_REGEX)) {
              return <span key={`text-${lineIndex}-${tokenIndex}`}>{token}</span>;
            }

            return (
              <a
                key={`link-${lineIndex}-${tokenIndex}`}
                href={normalizeExternalUrl(token)}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-sky-700"
              >
                {token}
              </a>
            );
          })}
        </p>
      );
    });
  };

  if (!blog) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-zinc-950 px-4 py-8 text-zinc-900">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-purple-900/70 to-zinc-950" />
          <div className="absolute -top-24 right-10 h-72 w-72 rounded-full bg-amber-300/25 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-64 w-[150%] -translate-x-1/2 rounded-t-[55%] bg-sky-500/20 blur-2xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl rounded-xl border border-zinc-300 bg-white p-6">
          <p className="text-sm text-zinc-700">This blog is not available on this device yet.</p>
          <p className="mt-2 text-sm text-zinc-700">If needed, restore your backup JSON from the admin dashboard.</p>
          <Link href="/" className="mt-4 inline-block text-sm font-semibold text-sky-700 hover:text-sky-600">
            ← Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 px-4 py-8 text-zinc-900">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-purple-900/70 to-zinc-950" />
        <div className="absolute -top-24 right-10 h-72 w-72 rounded-full bg-amber-300/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-[150%] -translate-x-1/2 rounded-t-[55%] bg-sky-500/20 blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Link href="/" className="rounded-md border border-zinc-300/90 bg-white/95 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider hover:bg-white">
            Back Home
          </Link>
          <button
            type="button"
            onClick={copyShareLink}
            className="rounded-md border border-zinc-300/90 bg-white/95 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider hover:bg-white"
          >
            Copy Share Link
          </button>
        </div>

        <article className="rounded-xl border border-zinc-300 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">{blog.category || "Seasonal"}</p>
          <h1 className="mt-2 text-4xl font-bold text-zinc-950">{blog.title}</h1>

          <div className="mt-5 max-h-[62vh] overflow-y-auto pr-2">
            {renderBlogTextWithLinks(blog.excerpt)}
          </div>

          {blog.blogUrl ? (
            <a
              href={normalizeExternalUrl(blog.blogUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Open Source Link
            </a>
          ) : null}
        </article>
      </div>
    </main>
  );
}
