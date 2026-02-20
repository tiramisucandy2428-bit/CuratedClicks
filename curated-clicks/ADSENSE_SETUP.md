# AdSense Setup (Curated Clicks)

This project now includes:
- Global AdSense script in app layout
- `public/ads.txt`
- Blog-page-only ad placements (left, right, and bottom)

## Required environment variable

Set in Vercel (or Render):
- `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-1603923202565384`
- `NEXT_PUBLIC_ADSENSE_SLOT_BLOG_SIDE=<your-blog-side-ad-slot-id>`
- `NEXT_PUBLIC_ADSENSE_SLOT_BLOG_BOTTOM=<your-blog-bottom-ad-slot-id>`

Get slot IDs from AdSense:
- Ads -> By ad unit -> create a vertical unit (for side ads) and copy slot ID
- Ads -> By ad unit -> create a horizontal unit (for bottom ad) and copy slot ID

Main homepage ad is removed. Ads now render only on opened blog pages.

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
