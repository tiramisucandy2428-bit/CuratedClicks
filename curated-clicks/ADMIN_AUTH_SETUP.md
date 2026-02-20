# Admin Auth Environment Variables

Set these variables in your hosting provider (Vercel/Render):

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET` (use a long random value)

## Notes

- Admin login now uses server API routes and an HttpOnly cookie.
- No admin credentials are stored in client-side code.
- If these variables are missing, admin login will fail with a configuration error.
