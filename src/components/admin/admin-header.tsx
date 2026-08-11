import { useQuery } from "@tanstack/react-query";
import { useRouterState } from "@tanstack/react-router";
import { Bell, Menu, Search, Plus } from "lucide-react";
import { notificationsQuery } from "@/lib/admin/queries";
import { allNavItems } from "@/lib/admin/nav";
import { cn } from "@/lib/utils";

function useCurrentTitle() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const match = [...allNavItems]
    .sort((a, b) => b.to.length - a.to.length)
    .find((i) => (i.to === "/admin" ? pathname === "/admin" : pathname.startsWith(i.to)));
  return match?.label ?? "Administration";
}

export function AdminHeader({
  onOpenNotifications,
  onOpenMenu,
}: {
  onOpenNotifications: () => void;
  onOpenMenu: () => void;
}) {
  const title = useCurrentTitle();
  const { data = [] } = useQuery(notificationsQuery());
  const unread = data.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-3 border-b border-line bg-admin-surface/95 px-4 backdrop-blur-md sm:px-6">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Ouvrir le menu"
        className="grid size-10 shrink-0 place-items-center border border-line text-navy transition-colors hover:border-gold lg:hidden"
      >
        <Menu className="size-4.5" />
      </button>

      <div className="min-w-0 flex-1">
        <p className="hidden text-[0.58rem] tracking-[0.22em] text-muted-foreground uppercase sm:block">
          STE MABANIS
        </p>
        <h1 className="display truncate text-xl leading-tight sm:text-2xl">{title}</h1>
      </div>

      {/* Search collapses to an icon button on small screens. */}
      <label className="relative hidden items-center md:flex">
        <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Rechercher…"
          aria-label="Rechercher"
          className="h-10 w-52 border border-line bg-background pr-3 pl-9 text-sm transition-[width,border-color] duration-300 outline-none placeholder:text-muted-foreground focus:w-72 focus:border-gold lg:w-64 lg:focus:w-80"
        />
      </label>
      <button
        type="button"
        aria-label="Rechercher"
        className="grid size-10 shrink-0 place-items-center border border-line text-navy transition-colors hover:border-gold md:hidden"
      >
        <Search className="size-4" />
      </button>

      <button
        type="button"
        onClick={onOpenNotifications}
        aria-label={`Notifications${unread ? ` (${unread} non lues)` : ""}`}
        className="relative grid size-10 shrink-0 place-items-center border border-line text-navy transition-colors hover:border-gold"
      >
        <Bell className="size-4" />
        {unread > 0 ? (
          <span className="absolute -top-1.5 -right-1.5 grid size-[1.15rem] place-items-center bg-gold text-[0.6rem] font-medium text-navy tabular-nums">
            {unread > 9 ? "9+" : unread}
          </span>
        ) : null}
      </button>

      <button
        type="button"
        className={cn(
          "hidden shrink-0 items-center gap-2 bg-gold px-4 py-2.5 text-[0.68rem] tracking-[0.14em] text-navy uppercase transition-colors hover:bg-navy hover:text-white sm:inline-flex",
        )}
      >
        <Plus className="size-3.5" />
        Nouveau
      </button>
    </header>
  );
}
