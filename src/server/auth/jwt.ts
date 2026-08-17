import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { env } from "../env";

const JWT_SECRET = new TextEncoder().encode(env().JWT_SECRET);
const JWT_ISSUER = "ste-mabanis";
const JWT_AUDIENCE = "ste-mabanis-admin";

export interface AdminJWTPayload extends JWTPayload {
  sub: string;
  email: string;
  name: string;
  role: "directrice" | "commercial" | "assistant";
  staffRole: "agent" | "manager" | "admin" | "directrice" | "commercial" | "assistant";
  iat?: number;
  exp?: number;
}

export async function createToken(payload: Omit<AdminJWTPayload, "iat" | "exp">): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<AdminJWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: "ste-mabanis",
      audience: "ste-mabanis-admin",
    });
    return payload as unknown as AdminJWTPayload;
  } catch {
    return null;
  }
}

export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader) return null;
  const [scheme, token] = authHeader.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) return null;
  return token;
}