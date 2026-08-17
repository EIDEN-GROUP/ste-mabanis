import { getRequestHeader, setResponseHeader } from "@tanstack/react-start/server";

const COOKIE_PATH = "/";

function cookieFlags(options: {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
  maxAge?: number;
  path?: string;
}): string {
  const parts = [`Path=${options.path ?? COOKIE_PATH}`];
  if (options.httpOnly !== false) parts.push("HttpOnly");
  if (options.secure !== false) parts.push("Secure");
  parts.push(`SameSite=${options.sameSite ?? "Lax"}`);
  if (typeof options.maxAge === "number") parts.push(`Max-Age=${options.maxAge}`);
  return parts.join("; ");
}

export function getCookie(name: string): string | undefined {
  const header = getRequestHeader("cookie");
  if (!header) return undefined;
  for (const part of header.split(/;\s*/)) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    if (part.slice(0, eq).trim() === name) return part.slice(eq + 1);
  }
  return undefined;
}

export function setCookie(
  name: string,
  value: string,
  options: {
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "strict" | "lax" | "none";
    maxAge?: number;
    path?: string;
  } = {},
): void {
  const flags = cookieFlags({ httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 60 * 8, ...options });
  setResponseHeader("Set-Cookie", `${name}=${value}; ${flags}`);
}

export function deleteCookie(name: string, options: { path?: string } = {}): void {
  setResponseHeader("Set-Cookie", `${name}=; ${cookieFlags({ maxAge: 0, ...options })}`);
}
