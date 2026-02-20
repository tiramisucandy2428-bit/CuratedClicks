import { NextResponse } from "next/server";
import { getAdminConfig, verifyAdminSessionToken } from "@/lib/adminAuth";

const SESSION_COOKIE_NAME = "cc_admin_session";

export async function GET(request) {
  const config = getAdminConfig();
  if (!config) {
    return NextResponse.json({ authenticated: false, error: "Admin auth not configured." }, { status: 200 });
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const authenticated = verifyAdminSessionToken(token, config.secret);
  return NextResponse.json({ authenticated }, { status: 200 });
}
