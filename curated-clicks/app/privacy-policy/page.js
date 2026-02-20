import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Curated Clicks",
  description: "Privacy Policy for Curated Clicks.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100">
      <div className="mx-auto max-w-3xl rounded-xl border border-zinc-700 bg-zinc-900 p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-zinc-100">Privacy Policy</h1>

        <section className="mt-5 space-y-3 text-sm leading-relaxed text-zinc-300 sm:text-base">
          <p>
            Curated Clicks respects your privacy. This page explains what information may be collected and how it is
            used.
          </p>
          <p>
            We may use analytics and advertising services (including Google AdSense) that collect non-personal
            information such as browser type, pages visited, and device identifiers through cookies or similar
            technologies.
          </p>
          <p>
            Third-party vendors, including Google, may use cookies to serve ads based on your prior visits to this and
            other websites.
          </p>
          <p>
            You can manage cookie preferences through your browser settings and Google Ads Settings.
          </p>
          <p>
            If you contact us directly, we may store your message details only for communication purposes.
          </p>
          <p>This policy may be updated from time to time. Please review this page periodically.</p>
        </section>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/" className="rounded-md border border-zinc-600 px-3 py-2 text-sm hover:bg-zinc-800">
            Back Home
          </Link>
          <Link href="/about" className="rounded-md border border-zinc-600 px-3 py-2 text-sm hover:bg-zinc-800">
            About
          </Link>
        </div>
      </div>
    </main>
  );
}
