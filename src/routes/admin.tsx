import { useEffect, useState } from "react";
import { createFileRoute, Navigate, Outlet, useRouterState } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { SessionProvider, useSession } from "@/lib/admin/session";
import { requireAuth, type AdminUser } from "@/lib/admin/auth/session";
import { pathAllowedFor } from "@/lib/admin/nav";
import { toast } from "@/components/admin/primitives";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Administration — STE MABANIS" },
      {
        name: "description",
        content: "Console de gestion STE MABANIS : portefeuille, CRM, agenda et transactions.",
      },
      // The back office must never be indexed.
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminGate,
});

/** Centered loader shown while the session cookie is being verified. */
function FullScreenLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-admin-bg">
      <Loader2 className="size-8 animate-spin text-gold" />
    </div>
  );
}

/**
 * Login gate: the whole /admin workspace requires a valid session cookie.
 * The verified role seeds the workspace, and non-directrice roles are locked
 * to their own role (no demo role switching for non-directrice accounts).
 */
function AdminGate() {
  const [user, setUser] = useState<AdminUser | null | undefined>(undefined);

  // Client-only verification: SSR renders the loader, then the effect resolves.
  useEffect(() => {
    let alive = true;
    requireAuth()
      .then((u) => {
        if (alive) setUser(u);
      })
      .catch(() => {
        if (alive) setUser(null);
      });
    return () => {
      alive = false;
    };
  }, []);

  if (user === undefined) return <FullScreenLoader />;
  if (!user) return <Navigate to="/login" />;

  return (
    <SessionProvider
      initialRole={user.role}
      roleLocked={user.role !== "directrice"}
      userName={user.name}
    >
      <AdminShell>
        <WorkspaceGuard />
      </AdminShell>
    </SessionProvider>
  );
}

/** Redirects to the dashboard when the workspace doesn't allow the current URL. */
function WorkspaceGuard() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { role, roleInfo } = useSession();
  const allowed = pathAllowedFor(role, pathname);

  // One toast per blocked visit, so a direct URL to a restricted screen is explained.
  useEffect(() => {
    if (allowed) return;
    toast.error(
      "Accès refusé",
      `Cet espace est réservé à ${roleInfo.label} — vous avez été redirigé.`,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!allowed) {
    return <Navigate to="/admin" />;
  }
  return <Outlet />;
}
