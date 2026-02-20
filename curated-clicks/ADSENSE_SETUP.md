# AdSense Setup (Curated Clicks)

This project now includes:
- Global AdSense script in app layout
- `public/ads.txt`

## Required environment variable

Set in Vercel (or Render):
- `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-1603932202565384`
- `NEXT_PUBLIC_ADSENSE_SLOT_TOP=<your-horizontal-ad-slot-id>`

Get `NEXT_PUBLIC_ADSENSE_SLOT_TOP` from AdSense:
- Ads -> By ad unit -> Display ads -> create a horizontal unit -> copy ad slot ID

This project renders that unit at the top of every page.

## Verify after deploy

- Open: `https://curated-clicks.vercel.app/ads.txt`
- Confirm it shows:
  - `google.com, pub-1603932202565384, DIRECT, f08c47fec0942fa0`

## AdSense dashboard status

- In AdSense -> Sites, wait for:
  - Code detected
  - Ads.txt found
  - Site review completion

## Notes

- Ad serving is not immediate after setup; approval/crawling can take time.
- Keep payments and account verification complete in AdSense.
