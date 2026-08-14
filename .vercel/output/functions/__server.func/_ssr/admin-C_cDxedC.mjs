import { i as __toESM } from "../_runtime.mjs";
import { i as cn } from "./utils-BWXQYj3d.mjs";
import { o as require_jsx_runtime, r as useQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { b as Navigate, f as useRouterState, h as Outlet, x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as STAFF_ROLES } from "./types-CH15H5aZ.mjs";
import { H as useReadAllNotifications, U as useReadNotification, m as notificationsQuery } from "./queries-Dq_yS5N4.mjs";
import { C as Scale, Ct as CalendarClock, Et as Bell, G as LayoutDashboard, J as Info, M as PanelLeftOpen, N as PanelLeftClose, P as Palette, R as Menu, S as Search, St as CalendarDays, T as Receipt, Tt as Building2, _ as SquareKanban, _t as ChevronDown, bt as ChartColumn, c as UserPlus, jt as ArrowUpRight, n as X, nt as FolderOpen, o as Users, r as Workflow, s as UserRound, v as SquareCheckBig, vt as Check, yt as CheckCheck, z as Megaphone } from "../_libs/lucide-react.mjs";
import { D as toast$1, T as relativeTime } from "./primitives-BRdCR_bJ.mjs";
import { i as useAgentsForRole, n as SessionProvider, o as useSession } from "./session-BlPZ3SJa.mjs";
import { t as mabanis_logo_default } from "./mabanis-logo-GECC4AGv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-C_cDxedC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var navGroups = [
	{
		title: "Pilotage",
		items: [{
			to: "/admin",
			label: "Tableau de bord",
			icon: LayoutDashboard,
			phase: 2,
			ready: true
		}, {
			to: "/admin/design",
			label: "Design system",
			icon: Palette,
			phase: 2,
			ready: true,
			roles: ["directrice"]
		}]
	},
	{
		title: "Portefeuille",
		items: [
			{
				to: "/admin/proprietes",
				label: "Propriétés",
				icon: Building2,
				phase: 2,
				ready: true
			},
			{
				to: "/admin/clients",
				label: "Clients",
				icon: Users,
				phase: 2,
				ready: true
			},
			{
				to: "/admin/crm",
				label: "Pipeline CRM",
				icon: SquareKanban,
				phase: 2,
				ready: true,
				roles: ["directrice", "commercial"]
			}
		]
	},
	{
		title: "Opérations",
		items: [
			{
				to: "/admin/agenda",
				label: "Agenda",
				icon: CalendarDays,
				phase: 3,
				ready: true
			},
			{
				to: "/admin/transactions",
				label: "Transactions",
				icon: Receipt,
				phase: 3,
				ready: true
			},
			{
				to: "/admin/documents",
				label: "Documents",
				icon: FolderOpen,
				phase: 3,
				ready: true
			},
			{
				to: "/admin/taches",
				label: "Tâches",
				icon: SquareCheckBig,
				phase: 3,
				ready: true
			}
		]
	},
	{
		title: "Analyse",
		items: [{
			to: "/admin/rapports",
			label: "Rapports",
			icon: ChartColumn,
			phase: 4,
			ready: true,
			roles: ["directrice"]
		}]
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
				roles: ["directrice"]
			},
			{
				to: "/admin/matching",
				label: "Matching",
				icon: Scale,
				phase: 4,
				ready: true,
				roles: ["directrice", "commercial"]
			},
			{
				to: "/admin/marketing",
				label: "Marketing",
				icon: Megaphone,
				phase: 4,
				ready: true,
				roles: ["directrice"]
			},
			{
				to: "/admin/portail-client",
				label: "Portail client",
				icon: UserRound,
				phase: 4,
				ready: true,
				roles: ["directrice"]
			}
		]
	}
];
/** The four destinations promoted to the mobile bottom bar. */
var bottomNavItems = [
	navGroups.flatMap((g) => g.items)[0],
	{
		to: "/admin/proprietes",
		label: "Biens",
		icon: Building2,
		phase: 2,
		ready: true
	},
	{
		to: "/admin/crm",
		label: "Pipeline",
		icon: SquareKanban,
		phase: 2,
		ready: true,
		roles: ["directrice", "commercial"]
	},
	{
		to: "/admin/agenda",
		label: "Agenda",
		icon: CalendarDays,
		phase: 3,
		ready: true
	}
];
function itemVisibleForRole(item, role) {
	return !item.roles || item.roles.includes(role);
}
function navGroupsFor(role) {
	return navGroups.map((g) => ({
		...g,
		items: g.items.filter((i) => itemVisibleForRole(i, role))
	})).filter((g) => g.items.length > 0);
}
function allNavItemsFor(role) {
	return navGroupsFor(role).flatMap((g) => g.items);
}
function bottomNavItemsFor(role) {
	return bottomNavItems.filter((i) => itemVisibleForRole(i, role));
}
/** Whether a given admin path is part of the role's workspace. */
function pathAllowedFor(role, pathname) {
	return allNavItemsFor(role).some((i) => i.to === "/admin" ? pathname === "/admin" : pathname === i.to || pathname.startsWith(i.to + "/"));
}
/** Rail widths. Kept here so the shell can offset content by the same values. */
var RAIL_EXPANDED = "16.5rem";
var RAIL_COLLAPSED = "4.5rem";
function isActive$1(pathname, to) {
	return to === "/admin" ? pathname === "/admin" : pathname.startsWith(to);
}
function NavRow({ item, collapsed, active, index }) {
	const Icon = item.icon;
	const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": true,
			className: cn("absolute inset-y-1 left-0 w-[3px] origin-top bg-gold transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]", active ? "scale-y-100" : "scale-y-0")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("size-[1.15rem] shrink-0 transition-colors duration-300", active ? "text-gold" : "text-admin-sidebar-muted group-hover:text-admin-sidebar-fg") }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("min-w-0 flex-1 truncate text-left text-[0.82rem] transition-[opacity,transform] duration-300", collapsed ? "pointer-events-none -translate-x-1 opacity-0" : "translate-x-0 opacity-100"),
			children: item.label
		}),
		!item.ready && !collapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "shrink-0 border border-admin-sidebar-muted/40 px-1.5 py-0.5 text-[0.55rem] tracking-[0.14em] text-admin-sidebar-muted uppercase",
			children: ["P", item.phase]
		}) : null
	] });
	const className = cn("group relative flex items-center gap-3 py-2.5 pr-3 pl-4 transition-colors duration-300", active ? "bg-admin-sidebar-hover text-admin-sidebar-fg" : "text-admin-sidebar-muted hover:bg-admin-sidebar-hover/60 hover:text-admin-sidebar-fg");
	if (!item.ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(className, "cursor-not-allowed opacity-60"),
		title: `${item.label} — phase ${item.phase}`,
		style: { ["--i"]: index },
		children: body
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: item.to,
		className,
		title: collapsed ? item.label : void 0,
		style: { ["--i"]: index },
		children: body
	});
}
function AdminSidebar({ collapsed, onToggle, className }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { role } = useSession();
	const groups = navGroupsFor(role);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: cn("rail-transition flex h-full flex-col overflow-hidden bg-admin-sidebar text-admin-sidebar-fg", className),
		style: { width: collapsed ? RAIL_COLLAPSED : RAIL_EXPANDED },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-16 shrink-0 items-center gap-3 border-b border-white/10 px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin",
					className: "flex min-w-0 items-center gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: mabanis_logo_default,
						alt: "STE MABANIS",
						width: 200,
						height: 200,
						className: "h-8 w-auto shrink-0 brightness-0 invert"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("min-w-0 flex-1 truncate text-[0.6rem] tracking-[0.2em] text-admin-sidebar-muted uppercase transition-opacity duration-300", collapsed ? "opacity-0" : "opacity-100"),
					children: "Admin"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex-1 overflow-x-hidden overflow-y-auto py-4",
				children: groups.map((group, gi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: gi === 0 ? "" : "mt-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: cn("px-4 pb-2 text-[0.58rem] tracking-[0.22em] text-admin-sidebar-muted/70 uppercase transition-[opacity,height] duration-300", collapsed ? "h-0 overflow-hidden opacity-0" : "h-auto opacity-100"),
							children: group.title
						}),
						collapsed && gi > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-4 mb-2 h-px bg-white/10" }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col",
							children: group.items.map((item, ii) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavRow, {
								item,
								collapsed,
								active: isActive$1(pathname, item.to),
								index: gi * 3 + ii
							}, item.to + item.label))
						})
					]
				}, group.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shrink-0 border-t border-white/10 p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: cn("group mb-2 flex items-center gap-3 px-1 py-2 text-[0.75rem] text-admin-sidebar-muted transition-colors hover:text-gold", collapsed && "justify-center"),
					title: collapsed ? "Voir le site public" : void 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("truncate transition-opacity duration-300", collapsed && "hidden"),
						children: "Voir le site"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onToggle,
					"aria-label": collapsed ? "Déplier le menu" : "Replier le menu",
					className: cn("flex w-full items-center gap-3 px-1 py-2 text-[0.75rem] text-admin-sidebar-muted transition-colors hover:text-admin-sidebar-fg", collapsed && "justify-center"),
					children: [collapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftOpen, { className: "size-4 shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftClose, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("truncate transition-opacity duration-300", collapsed && "hidden"),
						children: "Replier"
					})]
				})]
			})
		]
	});
}
var ROLE_ORDER = [
	"directrice",
	"commercial",
	"assistant"
];
function useCurrentTitle() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { role } = useSession();
	return [...allNavItemsFor(role)].sort((a, b) => b.to.length - a.to.length).find((i) => i.to === "/admin" ? pathname === "/admin" : pathname.startsWith(i.to))?.label ?? "Administration";
}
function AdminHeader({ onOpenNotifications, onOpenMenu }) {
	const title = useCurrentTitle();
	const { data = [] } = useQuery(notificationsQuery());
	const unread = data.filter((n) => !n.read).length;
	const { role, roleInfo, agentId, switchRole, switchAgent } = useSession();
	const agents = useAgentsForRole("commercial");
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const panelRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(false);
		};
		const onClick = (e) => {
			if (!panelRef.current?.contains(e.target)) setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		window.addEventListener("mousedown", onClick);
		return () => {
			window.removeEventListener("keydown", onKey);
			window.removeEventListener("mousedown", onClick);
		};
	}, [open]);
	const pickRole = (next) => {
		switchRole(next);
		setOpen(false);
		if (!pathAllowedFor(next, pathname)) {
			const first = allNavItemsFor(next)[0];
			if (first) navigate({ to: first.to });
		}
		toast$1.success("Espace activé", `${STAFF_ROLES[next].label} — ${STAFF_ROLES[next].tagline}.`);
	};
	const pickAgent = (id) => {
		switchAgent(id);
		toast$1.success("Espace commercial", `Vous travaillez désormais avec ${agents.find((a) => a.id === id)?.name ?? "l'agent sélectionné"}.`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 flex h-16 shrink-0 items-center gap-3 border-b border-line bg-admin-surface/95 px-4 backdrop-blur-md sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onOpenMenu,
				"aria-label": "Ouvrir le menu",
				className: "grid size-10 shrink-0 place-items-center border border-line text-navy transition-colors hover:border-gold lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4.5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "hidden text-[0.58rem] tracking-[0.22em] text-muted-foreground uppercase sm:block",
					children: "STE MABANIS"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "display truncate text-xl leading-tight sm:text-2xl",
					children: title
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "relative hidden items-center md:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "search",
					placeholder: "Rechercher…",
					"aria-label": "Rechercher",
					className: "h-10 w-52 border border-line bg-background pr-3 pl-9 text-sm transition-[width,border-color] duration-300 outline-none placeholder:text-muted-foreground focus:w-72 focus:border-gold lg:w-64 lg:focus:w-80"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Rechercher",
				className: "grid size-10 shrink-0 place-items-center border border-line text-navy transition-colors hover:border-gold md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative shrink-0",
				ref: panelRef,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setOpen((v) => !v),
					"aria-expanded": open,
					"aria-label": `Mon espace : ${roleInfo.label}`,
					className: "flex h-10 items-center gap-2 border border-line bg-admin-surface px-3 text-sm transition-colors hover:border-gold",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 shrink-0 rounded-full bg-gold" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden max-w-[10rem] truncate text-navy sm:block",
							children: roleInfo.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-3.5 text-muted-foreground transition-transform", open && "rotate-180") })
					]
				}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute right-0 z-50 mt-2 w-[21rem] border border-line bg-admin-surface shadow-panel",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b border-line px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.58rem] tracking-[0.2em] text-muted-foreground uppercase",
								children: "Mon espace de travail"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-xs text-muted-foreground",
								children: "Choisissez un rôle pour voir ses accès et ses actions."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "max-h-72 overflow-y-auto",
							children: ROLE_ORDER.map((r) => {
								const info = STAFF_ROLES[r];
								const active = r === role;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => pickRole(r),
									className: cn("flex w-full items-start gap-3 px-4 py-3 text-left transition-colors", active ? "bg-sand" : "hover:bg-sand/60"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("mt-1.5 size-2 shrink-0 rounded-full", active ? "bg-gold" : "bg-muted-foreground/40") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-2 text-sm font-medium text-navy",
											children: [info.label, active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 text-gold" }) : null]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-xs text-muted-foreground",
											children: info.tagline
										})]
									})]
								}) }, r);
							})
						}),
						role === "commercial" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-line px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.58rem] tracking-[0.2em] text-muted-foreground uppercase",
								children: "Travailler comme"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-2 space-y-1",
								children: agents.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => pickAgent(a.id),
									className: cn("flex w-full items-center gap-2.5 px-2 py-1.5 text-sm transition-colors", agentId === a.id ? "bg-sand text-navy" : "text-muted-foreground hover:bg-sand/60 hover:text-navy"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-3.5 text-gold" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex-1 truncate text-left",
											children: a.name
										}),
										agentId === a.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 text-gold" }) : null
									]
								}) }, a.id))
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-line bg-admin-bg/60 px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.58rem] tracking-[0.2em] text-muted-foreground uppercase",
								children: "Dans cet espace"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-1.5 space-y-1",
								children: roleInfo.capabilities.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-2 text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1 shrink-0 rounded-full bg-gold/70" }), c]
								}, c))
							})]
						})
					]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onOpenNotifications,
				"aria-label": `Notifications${unread ? ` (${unread} non lues)` : ""}`,
				className: "relative grid size-10 shrink-0 place-items-center border border-line text-navy transition-colors hover:border-gold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" }), unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute -top-1.5 -right-1.5 grid size-[1.15rem] place-items-center bg-gold text-[0.6rem] font-medium text-navy tabular-nums",
					children: unread > 9 ? "9+" : unread
				}) : null]
			})
		]
	});
}
function isActive(pathname, to) {
	return to === "/admin" ? pathname === "/admin" : pathname.startsWith(to);
}
/** Full-height drawer for the complete site map on phones and tablets. */
function AdminNavDrawer({ open, onClose }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { role } = useSession();
	const groups = navGroupsFor(role);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = prev;
			window.removeEventListener("keydown", onKey);
		};
	}, [open, onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		onClick: onClose,
		"aria-hidden": true,
		className: cn("fixed inset-0 z-[80] bg-navy/50 backdrop-blur-[2px] transition-opacity duration-400 lg:hidden", open ? "opacity-100" : "pointer-events-none opacity-0")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Menu administration",
		"aria-hidden": !open,
		className: cn("fixed inset-y-0 left-0 z-[90] flex w-[min(20rem,85vw)] flex-col bg-admin-sidebar text-admin-sidebar-fg transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none lg:hidden", open ? "translate-x-0" : "-translate-x-full"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: mabanis_logo_default,
					alt: "STE MABANIS",
					width: 200,
					height: 200,
					className: "h-8 w-auto brightness-0 invert"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					"aria-label": "Fermer le menu",
					className: "grid size-9 place-items-center border border-white/20 transition-colors hover:border-gold",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex-1 overflow-y-auto py-4",
				children: groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-5 pb-2 text-[0.58rem] tracking-[0.22em] text-admin-sidebar-muted/70 uppercase",
						children: group.title
					}), group.items.map((item, i) => {
						const Icon = item.icon;
						const active = isActive(pathname, item.to);
						const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("size-[1.15rem] shrink-0", active ? "text-gold" : "opacity-70") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1 truncate",
								children: item.label
							}),
							!item.ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "border border-admin-sidebar-muted/40 px-1.5 py-0.5 text-[0.55rem] tracking-[0.14em] uppercase",
								children: ["P", item.phase]
							}) : null
						] });
						const cls = cn("flex min-h-12 items-center gap-3 px-5 py-3 text-sm", active ? "bg-admin-sidebar-hover text-admin-sidebar-fg" : "text-admin-sidebar-muted");
						return item.ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							onClick: onClose,
							className: cls,
							children: inner
						}, item.to + item.label) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn(cls, "opacity-55"),
							children: inner
						}, item.to + item.label);
					})]
				}, group.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				onClick: onClose,
				className: "flex min-h-12 shrink-0 items-center gap-3 border-t border-white/10 px-5 py-3 text-sm text-admin-sidebar-muted transition-colors hover:text-gold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" }), "Voir le site public"]
			})
		]
	})] });
}
/** Bottom bar — the four most-used destinations, thumb height. */
function AdminBottomNav() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { role } = useSession();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": "Navigation principale",
		className: "fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-line bg-admin-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden",
		children: bottomNavItemsFor(role).map((item) => {
			const Icon = item.icon;
			const active = isActive(pathname, item.to);
			const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "relative",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("size-5", active ? "text-gold" : "text-muted-foreground") })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("text-[0.62rem] tracking-[0.08em]", active ? "text-navy" : "text-muted-foreground"),
				children: item.label
			})] });
			const cls = "flex min-h-14 flex-col items-center justify-center gap-1 py-2 transition-colors";
			return item.ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: item.to,
				className: cls,
				children: inner
			}, item.to + item.label) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn(cls, "opacity-45"),
				children: inner
			}, item.to + item.label);
		})
	});
}
var ICONS = {
	lead: UserPlus,
	appointment: CalendarClock,
	task: SquareCheckBig,
	transaction: Receipt,
	system: Info
};
var TONES = {
	lead: "text-temp-hot",
	appointment: "text-chart-3",
	task: "text-status-offer",
	transaction: "text-positive",
	system: "text-muted-foreground"
};
function NotificationCenter({ open, onClose }) {
	const { data = [], isPending } = useQuery(notificationsQuery());
	const readOne = useReadNotification();
	const readAll = useReadAllNotifications();
	const unread = data.filter((n) => !n.read).length;
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		onClick: onClose,
		"aria-hidden": true,
		className: cn("fixed inset-0 z-[80] bg-navy/40 backdrop-blur-[2px] transition-opacity duration-400", open ? "opacity-100" : "pointer-events-none opacity-0")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Centre de notifications",
		"aria-hidden": !open,
		className: cn("fixed inset-y-0 right-0 z-[90] flex w-full max-w-[26rem] flex-col bg-admin-surface shadow-elegant transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none", open ? "translate-x-0" : "translate-x-full"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex h-16 shrink-0 items-center gap-3 border-b border-line px-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Notifications"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 truncate text-xs text-muted-foreground",
						children: unread > 0 ? `${unread} non lue${unread > 1 ? "s" : ""}` : "Tout est à jour"
					})]
				}),
				unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => readAll.mutate(),
					className: "inline-flex min-h-11 items-center gap-1.5 px-1 text-[0.68rem] tracking-[0.12em] text-muted-foreground uppercase transition-colors hover:text-gold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "size-3.5" }), "Tout lire"]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					"aria-label": "Fermer les notifications",
					className: "grid size-11 shrink-0 place-items-center border border-line text-navy transition-colors hover:border-gold",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-y-auto",
			children: isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-px",
				children: Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-[4.75rem]" }, i))
			}) : data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "p-8 text-center text-sm text-muted-foreground",
				children: "Aucune notification."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: data.map((n, i) => {
				const Icon = ICONS[n.kind];
				const row = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("mt-0.5 grid size-9 shrink-0 place-items-center border border-line bg-sand", TONES[n.kind]),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-start gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 flex-1 text-sm font-medium text-navy",
								children: n.title
							}), !n.read ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-label": "Non lue",
								className: "mt-1.5 size-2 shrink-0 bg-gold"
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-xs leading-relaxed text-muted-foreground",
							children: n.body
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1.5 block text-[0.65rem] tracking-[0.1em] text-muted-foreground/80 uppercase",
							children: relativeTime(n.createdAt)
						})
					]
				})] });
				const cls = cn("stagger-in flex w-full items-start gap-3 border-b border-line p-4 text-left transition-colors hover:bg-sand", !n.read && "bg-gold/[0.04]");
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					style: { ["--i"]: i },
					children: n.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: n.href,
						className: cls,
						onClick: () => {
							readOne.mutate(n.id);
							onClose();
						},
						children: row
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => readOne.mutate(n.id),
						className: cls,
						children: row
					})
				}, n.id);
			}) })
		})]
	})] });
}
var STORAGE_KEY = "mabanis:admin:rail-collapsed";
function AdminShell({ children }) {
	const [collapsed, setCollapsed] = (0, import_react.useState)(false);
	const [drawerOpen, setDrawerOpen] = (0, import_react.useState)(false);
	const [notificationsOpen, setNotificationsOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		setCollapsed(localStorage.getItem(STORAGE_KEY) === "1");
	}, []);
	const toggleRail = () => {
		setCollapsed((v) => {
			const next = !v;
			localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
			return next;
		});
	};
	(0, import_react.useEffect)(() => {
		setDrawerOpen(false);
		setNotificationsOpen(false);
	}, [pathname]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-admin-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSidebar, {
				collapsed,
				onToggle: toggleRail,
				className: "sticky top-0 hidden h-screen shrink-0 lg:flex"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminNavDrawer, {
				open: drawerOpen,
				onClose: () => setDrawerOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminHeader, {
					onOpenMenu: () => setDrawerOpen(true),
					onOpenNotifications: () => setNotificationsOpen(true)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1 px-4 pt-5 pb-24 sm:px-6 lg:px-8 lg:pt-7 lg:pb-8",
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminBottomNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationCenter, {
				open: notificationsOpen,
				onClose: () => setNotificationsOpen(false)
			})
		]
	});
}
/** Redirects to the dashboard when the workspace doesn't allow the current URL. */
function WorkspaceGuard() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { role, roleInfo } = useSession();
	const allowed = pathAllowedFor(role, pathname);
	(0, import_react.useEffect)(() => {
		if (allowed) return;
		toast$1.error("Accès refusé", `Cet espace est réservé à ${roleInfo.label} — vous avez été redirigé.`);
	}, [pathname]);
	if (!allowed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/admin" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
}
function AdminLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceGuard, {}) }) });
}
//#endregion
export { AdminLayout as component };
