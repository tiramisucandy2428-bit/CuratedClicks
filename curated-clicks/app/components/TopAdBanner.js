"use client";

import { useEffect } from "react";

const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const topAdSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP;

export default function TopAdBanner() {
  useEffect(() => {
    if (!adClient || !topAdSlot) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ignore runtime ad push errors.
    }
  }, []);

  if (!adClient || !topAdSlot) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-2 pt-2">
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: "90px" }}
        data-ad-client={adClient}
        data-ad-slot={topAdSlot}
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      />
    </div>
  );
}
