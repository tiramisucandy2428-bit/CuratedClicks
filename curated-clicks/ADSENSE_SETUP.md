# AdSense Setup (Curated Clicks)

This project now includes:
- Global AdSense script in app layout
- `public/ads.txt`

## Required environment variable

Set in Vercel (or Render):
- `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-1603923202565384`
- `NEXT_PUBLIC_ADSENSE_SLOT_TOP=<your-horizontal-ad-slot-id>`
- `NEXT_PUBLIC_ADSENSE_SLOT_MOBILE_TOP=<your-mobile-top-ad-slot-id>`

Get `NEXT_PUBLIC_ADSENSE_SLOT_TOP` from AdSense:
- Ads -> By ad unit -> Display ads -> create a horizontal unit -> copy ad slot ID

Get `NEXT_PUBLIC_ADSENSE_SLOT_MOBILE_TOP` from AdSense:
- Ads -> By ad unit -> create a mobile-friendly unit (for example 320x50/responsive) -> copy ad slot ID

This project renders desktop and mobile top units separately to avoid oversized mobile whitespace.

## Verify after deploy

- Open: `https://curated-clicks.vercel.app/ads.txt`
- Confirm it shows:
  - `google.com, pub-1603923202565384, DIRECT, f08c47fec0942fa0`

## AdSense dashboard status

- In AdSense -> Sites, wait for:
  - Code detected
  - Ads.txt found
  - Site review completion

## Notes

- Ad serving is not immediate after setup; approval/crawling can take time.
- Keep payments and account verification complete in AdSense.
