import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "htb_admin_session";
const encoder = new TextEncoder();

function getSecret() {
  const secret = process.env.AUTH_SECRET || "local-dev-secret-change-me";
  return encoder.encode(secret);
}

export async function createSessionToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifySessionToken(token) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload;
  } catch (_error) {
    return null;
  }
}

export async function getAdminSession() {
  const token = (await cookies()).get(ADMIN_COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }
  return verifySessionToken(token);
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) {
    return null;
  }
  return session;
}
