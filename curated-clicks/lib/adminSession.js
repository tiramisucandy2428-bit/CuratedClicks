import { getAdminConfig, verifyAdminSessionToken } from "@/lib/adminAuth";

const SESSION_COOKIE_NAME = "cc_admin_session";

export function isAdminRequestAuthenticated(request) {
  const config = getAdminConfig();
  if (!config) {
    return false;
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  return verifyAdminSessionToken(token, config.secret);
}
