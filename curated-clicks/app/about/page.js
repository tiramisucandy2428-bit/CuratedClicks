import Link from "next/link";

export const metadata = {
  title: "About | Curated Clicks",
  description: "About Curated Clicks and what we publish.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100">
      <div className="mx-auto max-w-3xl rounded-xl border border-zinc-700 bg-zinc-900 p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-zinc-100">About Curated Clicks</h1>
        <p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
          Curated Clicks shares practical blogs on Home Decors, Gaming, AI tools, and Seasonal picks. We aim to
          publish clear, useful content that helps readers discover better tools, ideas, and products.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">
          Some pages may include advertisements and affiliate links to support maintaining and improving this site.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/" className="rounded-md border border-zinc-600 px-3 py-2 text-sm hover:bg-zinc-800">
            Back Home
          </Link>
          <Link href="/privacy-policy" className="rounded-md border border-zinc-600 px-3 py-2 text-sm hover:bg-zinc-800">
            Privacy Policy
          </Link>
        </div>
      </div>
    </main>
  );
}
