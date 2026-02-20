import { NextResponse } from "next/server";
import { createAdminSessionToken, getAdminConfig } from "@/lib/adminAuth";

const SESSION_COOKIE_NAME = "cc_admin_session";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export async function POST(request) {
  const config = getAdminConfig();
  if (!config) {
    return NextResponse.json(
      { error: "Admin environment variables are not configured." },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  const username = body?.username;
  const password = body?.password;

  if (username !== config.username || password !== config.password) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const token = createAdminSessionToken(username, config.secret);
  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  });

  return response;
}
