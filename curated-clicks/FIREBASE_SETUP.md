# Firebase Blog Feed Setup

This project now uses Firebase Firestore for blogs (public feed), while admin blog writes go through protected API routes.

## 1) Create Firebase project

- Open Firebase Console and create/select a project.
- Enable Firestore Database.

## 2) Create service account key

- Firebase Console -> Project settings -> Service accounts.
- Generate a new private key (JSON).
- From that JSON, copy:
  - `project_id`
  - `client_email`
  - `private_key`

## 3) Add environment variables (Vercel/Render)

- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

Important:
- Keep line breaks in `FIREBASE_PRIVATE_KEY` escaped as `\n` in env var value.

Also keep admin auth vars set:
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

## 4) Firestore collection

Create collection:
- `blogs`

Each document stores:
- `title` (string)
- `excerpt` (string)
- `blogUrl` (string)
- `category` (string)
- `pinned` (boolean)
- `createdAt` (number)

## 5) Deploy

- Redeploy after setting env vars.
- Blog pages and feed will sync across all devices.
