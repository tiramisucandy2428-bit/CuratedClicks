import { createHmac, timingSafeEqual } from "crypto";

const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 7;

function toBase64Url(value) {
  return Buffer.from(value).toString("base64url");
}

function fromBase64Url(value) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signPayload(payloadBase64, secret) {
  return createHmac("sha256", secret).update(payloadBase64).digest("base64url");
}

export function getAdminConfig() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!username || !password || !secret) {
    return null;
  }

  return { username, password, secret };
}

export function createAdminSessionToken(username, secret) {
  const payload = {
    username,
    exp: Date.now() + TOKEN_TTL_MS,
  };

  const payloadBase64 = toBase64Url(JSON.stringify(payload));
  const signature = signPayload(payloadBase64, secret);

  return `${payloadBase64}.${signature}`;
}

export function verifyAdminSessionToken(token, secret) {
  if (!token || typeof token !== "string") {
    return false;
  }

  const [payloadBase64, signature] = token.split(".");
  if (!payloadBase64 || !signature) {
    return false;
  }

  const expectedSignature = signPayload(payloadBase64, secret);
  const expectedBuffer = Buffer.from(expectedSignature);
  const actualBuffer = Buffer.from(signature);

  if (expectedBuffer.length !== actualBuffer.length) {
    return false;
  }

  if (!timingSafeEqual(expectedBuffer, actualBuffer)) {
    return false;
  }

  try {
    const payload = JSON.parse(fromBase64Url(payloadBase64));
    return typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}
