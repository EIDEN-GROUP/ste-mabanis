import { i as __toESM } from "../_runtime.mjs";
import { i as cn } from "./utils-BWXQYj3d.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _t as ChevronDown, mt as ChevronUp, pt as ChevronsUpDown } from "../_libs/lucide-react.mjs";
import { a as EmptyState, o as LoadingState } from "./primitives-BRdCR_bJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/data-table-D16aF3Go.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var HIDE = {
	sm: "hidden sm:table-cell",
	md: "hidden md:table-cell",
	lg: "hidden lg:table-cell",
	xl: "hidden xl:table-cell"
};
/**
* One dataset, two presentations: a real table from `md` up, and a stack of
* cards below it. The spec asks for cards rather than a squeezed table on
* phones, so the `<table>` is not merely scrolled — it is replaced.
*/
function DataTable({ rows, columns, getRowId, onRowClick, isLoading, empty, className }) {
	const [sort, setSort] = (0, import_react.useState)(null);
	const sorted = (0, import_react.useMemo)(() => {
		if (!sort) return rows;
		const col = columns.find((c) => c.id === sort.id);
		if (!col?.sortValue) return rows;
		const dir = sort.dir === "asc" ? 1 : -1;
		return [...rows].sort((a, b) => {
			const av = col.sortValue(a);
			const bv = col.sortValue(b);
			if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
			return String(av).localeCompare(String(bv), "fr") * dir;
		});
	}, [
		rows,
		columns,
		sort
	]);
	const toggleSort = (id) => setSort((s) => s?.id !== id ? {
		id,
		dir: "asc"
	} : s.dir === "asc" ? {
		id,
		dir: "desc"
	} : null);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, {
		rows: 6,
		className
	});
	if (!rows.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: empty?.title ?? "Aucun résultat",
		...empty?.description ? { description: empty.description } : {},
		...empty?.action ? { action: empty.action } : {},
		className
	});
	const primary = columns.find((c) => c.primary) ?? columns[0];
	const secondary = columns.filter((c) => c.id !== primary.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "hidden overflow-x-auto md:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full border-collapse text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
					className: "border-b border-line",
					children: columns.map((col) => {
						const active = sort?.id === col.id;
						const Icon = !active ? ChevronsUpDown : sort.dir === "asc" ? ChevronUp : ChevronDown;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							className: cn("px-4 py-3 text-left text-[0.6rem] font-medium tracking-[0.16em] text-muted-foreground uppercase", col.hideBelow && HIDE[col.hideBelow], col.className),
							children: col.sortValue ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => toggleSort(col.id),
								"aria-label": `Trier par ${col.header}`,
								className: cn("inline-flex items-center gap-1.5 transition-colors hover:text-navy", active && "text-navy"),
								children: [col.header, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("size-3", active ? "text-gold" : "opacity-45") })]
							}) : col.header
						}, col.id);
					})
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: sorted.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
					onClick: onRowClick ? () => onRowClick(row) : void 0,
					style: { ["--i"]: Math.min(i, 12) },
					className: cn("stagger-in border-b border-line transition-colors duration-200 last:border-0", onRowClick && "cursor-pointer hover:bg-sand"),
					children: columns.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: cn("px-4 py-3.5 align-middle", col.hideBelow && HIDE[col.hideBelow], col.className),
						children: col.cell(row)
					}, col.id))
				}, getRowId(row))) })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-3 md:hidden",
			children: sorted.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				style: { ["--i"]: Math.min(i, 12) },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					onClick: onRowClick ? () => onRowClick(row) : void 0,
					role: onRowClick ? "button" : void 0,
					tabIndex: onRowClick ? 0 : void 0,
					onKeyDown: onRowClick ? (e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							onRowClick(row);
						}
					} : void 0,
					className: cn("stagger-in border border-line bg-admin-surface p-4", onRowClick && "cursor-pointer transition-colors active:bg-sand"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-medium text-navy",
						children: primary.cell(row)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "mt-3 space-y-2 border-t border-line pt-3",
						children: secondary.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-[0.6rem] tracking-[0.14em] text-muted-foreground uppercase",
								children: col.header
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "min-w-0 text-right text-sm",
								children: col.cell(row)
							})]
						}, col.id))
					})]
				})
			}, getRowId(row)))
		})]
	});
}
//#endregion
export { DataTable as t };
