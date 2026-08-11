import {
  LayoutDashboard,
  Building2,
  Users,
  KanbanSquare,
  CalendarDays,
  Receipt,
  FolderOpen,
  CheckSquare,
  BarChart3,
  Workflow,
  Scale,
  Megaphone,
  UserRound,
  Palette,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
  /** Phase that introduces the screen; later phases render as "à venir". */
  phase: 2 | 3 | 4;
  ready: boolean;
};

export type NavGroup = { title: string; items: NavItem[] };

export const navGroups: NavGroup[] = [
  {
    title: "Pilotage",
    items: [
      { to: "/admin", label: "Tableau de bord", icon: LayoutDashboard, phase: 2, ready: true },
      { to: "/admin/design", label: "Design system", icon: Palette, phase: 2, ready: true },
    ],
  },
  {
    title: "Portefeuille",
    items: [
      { to: "/admin/proprietes", label: "Propriétés", icon: Building2, phase: 2, ready: true },
      { to: "/admin/clients", label: "Clients", icon: Users, phase: 2, ready: true },
      { to: "/admin/crm", label: "Pipeline CRM", icon: KanbanSquare, phase: 2, ready: true },
    ],
  },
  {
    title: "Opérations",
    items: [
      { to: "/admin/agenda", label: "Agenda", icon: CalendarDays, phase: 3, ready: true },
      { to: "/admin/transactions", label: "Transactions", icon: Receipt, phase: 3, ready: true },
      { to: "/admin/documents", label: "Documents", icon: FolderOpen, phase: 3, ready: true },
      { to: "/admin/taches", label: "Tâches", icon: CheckSquare, phase: 3, ready: true },
    ],
  },
  {
    title: "Analyse",
    items: [{ to: "/admin/rapports", label: "Rapports", icon: BarChart3, phase: 4, ready: true }],
  },
  {
    title: "Piloter",
    items: [
      {
        to: "/admin/automatisations",
        label: "Automatisations",
        icon: Workflow,
        phase: 4,
        ready: true,
      },
      { to: "/admin/matching", label: "Matching", icon: Scale, phase: 4, ready: true },
      { to: "/admin/marketing", label: "Marketing", icon: Megaphone, phase: 4, ready: true },
      {
        to: "/admin/portail-client",
        label: "Portail client",
        icon: UserRound,
        phase: 4,
        ready: true,
      },
    ],
  },
];

export const allNavItems = navGroups.flatMap((g) => g.items);

/** The four destinations promoted to the mobile bottom bar. */
export const bottomNavItems: NavItem[] = [
  allNavItems[0]!,
  { to: "/admin/proprietes", label: "Biens", icon: Building2, phase: 2, ready: true },
  { to: "/admin/crm", label: "Pipeline", icon: KanbanSquare, phase: 2, ready: true },
  { to: "/admin/agenda", label: "Agenda", icon: CalendarDays, phase: 3, ready: true },
];
