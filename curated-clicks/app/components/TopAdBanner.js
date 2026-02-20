"use client";

import { useEffect } from "react";

const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const topDesktopAdSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP;
const topMobileAdSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_MOBILE_TOP;

export default function TopAdBanner() {
  useEffect(() => {
    if (!adClient) return;

    const slotsToPush = [topDesktopAdSlot, topMobileAdSlot].filter(Boolean);
    if (!slotsToPush.length) return;

    slotsToPush.forEach(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // Ignore runtime ad push errors.
      }
    });
  }, []);

  if (!adClient || (!topDesktopAdSlot && !topMobileAdSlot)) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-2 pt-2">
      {topMobileAdSlot ? (
        <div className="md:hidden">
          <ins
            className="adsbygoogle"
            style={{ display: "block", minHeight: "50px" }}
            data-ad-client={adClient}
            data-ad-slot={topMobileAdSlot}
            data-ad-format="horizontal"
            data-full-width-responsive="true"
          />
        </div>
      ) : null}

      {topDesktopAdSlot ? (
        <div className="hidden md:block">
          <ins
            className="adsbygoogle"
            style={{ display: "block", minHeight: "90px" }}
            data-ad-client={adClient}
            data-ad-slot={topDesktopAdSlot}
            data-ad-format="horizontal"
            data-full-width-responsive="true"
          />
        </div>
      ) : null}
    </div>
  );
}
