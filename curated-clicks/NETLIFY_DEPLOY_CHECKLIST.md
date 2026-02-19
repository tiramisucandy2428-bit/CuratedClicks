# Netlify Deploy Checklist (Curated Clicks)

## 1) Push project to GitHub

Run these commands inside this folder:

```bash
git init
git add .
git commit -m "Initial Curated Clicks build"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## 2) Create site on Netlify

1. Go to Netlify dashboard.
2. Select **Add new site** -> **Import an existing project**.
3. Choose GitHub and select your repository.

## 3) Build settings

- **Base directory**: *(leave empty)*
- **Build command**: `npm run build`
- **Publish directory**: *(leave empty for Next.js runtime handling)*

If Netlify asks for explicit output, use `.next`.

## 4) Environment settings

In Site Settings -> Environment Variables:

- `NODE_VERSION=20`

## 5) Deploy and verify

1. Trigger deploy.
2. Open the generated Netlify URL.
3. Confirm flow:
   - Landing prompt shows: **Click the train engine to start**
   - Engine click reveals Home heading
   - Bogey buttons switch headings

## 6) Optional custom domain

1. Site Settings -> Domain management -> Add custom domain.
2. Configure DNS records as instructed by Netlify.
3. SSL is issued automatically.
