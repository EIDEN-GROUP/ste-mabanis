import { createServerFn } from "@tanstack/react-start";
import { getSupabase } from "@/server/db/client";
import { verifyPassword } from "@/server/auth/password";
import { createToken, verifyToken } from "@/server/auth/jwt";
import { setCookie, deleteCookie, getCookie } from "@/server/auth/cookies";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "directrice" | "commercial" | "assistant";
  staffRole: "agent" | "manager" | "admin" | "directrice" | "commercial" | "assistant";
};

type Role = AdminUser["role"];
type StaffRole = AdminUser["staffRole"];

const ROLE_MAP: Record<string, Role> = {
  directrice: "directrice",
  manager: "directrice",
  admin: "directrice",
  agent: "commercial",
  commercial: "commercial",
  assistant: "assistant",
};

export const login = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const body = (data ?? {}) as Record<string, unknown>;
    return {
      email: typeof body["email"] === "string" ? body["email"].toLowerCase().trim() : "",
      password: typeof body["password"] === "string" ? body["password"] : "",
      remember: Boolean(body["remember"]),
    };
  })
  .handler(async ({ data }) => {
    const supabase = getSupabase();

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("id, name, email, password_hash, staff_role, role")
      .eq("email", data.email)
      .maybeSingle();

    if (error) throw new Error("Erreur de base de données");
    if (!profile?.password_hash) throw new Error("Identifiants incorrects");

    const valid = await verifyPassword(data.password, profile.password_hash);
    if (!valid) throw new Error("Identifiants incorrects");

    const staffRole = profile.staff_role as StaffRole;
    const role = ROLE_MAP[staffRole] ?? "commercial";

    const token = await createToken({
      sub: profile.id,
      email: profile.email,
      name: profile.name,
      role,
      staffRole,
    });

    await setCookie("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: data.remember ? 60 * 60 * 8 : 60 * 30,
    });

    return {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      role,
      staffRole,
    } satisfies AdminUser;
  });

export const logout = createServerFn({ method: "POST" }).handler(async () => {
  deleteCookie("auth_token");
  return { success: true };
});

export const verifySession = createServerFn({ method: "GET" }).handler(async () => {
  const token = getCookie("auth_token");
  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload) return null;

  return {
    id: payload.sub,
    name: payload.name,
    email: payload.email,
    role: payload.role,
    staffRole: payload.staffRole,
  } satisfies AdminUser;
});

export const requireAuth = createServerFn({ method: "GET" }).handler(async () => {
  const token = getCookie("auth_token");
  const payload = token ? await verifyToken(token) : null;
  if (!payload) throw new Error("Non authentifié");

  return {
    id: payload.sub,
    name: payload.name,
    email: payload.email,
    role: payload.role,
    staffRole: payload.staffRole,
  } satisfies AdminUser;
});

