import { i as cn } from "./utils-BTE8P7Sw.mjs";
import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as YAxis, c as Line, d as Pie, f as Cell, i as LineChart, l as CartesianGrid, m as Tooltip, n as PieChart, o as XAxis, p as ResponsiveContainer, r as BarChart, s as Area, t as AreaChart, u as Bar } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/charts-Dxo2HWxE.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Recharts wrappers. Colours are read from the CSS tokens rather than written
* inline, so the charts follow the design system automatically.
*/
var SERIES = [
	"var(--chart-1)",
	"var(--chart-2)",
	"var(--chart-3)",
	"var(--chart-4)",
	"var(--chart-5)"
];
var axisProps = {
	stroke: "var(--muted-foreground)",
	fontSize: 11,
	tickLine: false,
	axisLine: false
};
function ChartTooltip({ active, payload, label: axisLabel, formatter }) {
	if (!active || !payload?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border border-line bg-admin-surface px-3 py-2 shadow-panel",
		children: [axisLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[0.6rem] tracking-[0.14em] text-muted-foreground uppercase",
			children: axisLabel
		}) : null, payload.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 flex items-center gap-2 text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "size-2 shrink-0",
					style: { background: p.color }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: p.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-auto font-medium tabular-nums text-navy",
					children: formatter && typeof p.value === "number" ? formatter(p.value) : p.value
				})
			]
		}, i))]
	});
}
function ChartFrame({ children, height = 260, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("w-full", className),
		style: { height },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children
		})
	});
}
function TrendChart({ data, xKey, series, height, formatter }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, {
		...height !== void 0 ? { height } : {},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
			data,
			margin: {
				top: 8,
				right: 8,
				bottom: 0,
				left: -18
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
					stroke: "var(--line)",
					vertical: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					dataKey: xKey,
					...axisProps
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					...axisProps,
					width: 52
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
					cursor: { stroke: "var(--line)" },
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, { ...formatter ? { formatter } : {} })
				}),
				series.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
					type: "monotone",
					dataKey: s.key,
					name: s.name,
					stroke: SERIES[i % SERIES.length],
					strokeWidth: 2,
					dot: false,
					activeDot: { r: 4 },
					animationDuration: 900
				}, s.key))
			]
		})
	});
}
function AreaTrendChart({ data, xKey, dataKey, name, height, formatter }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, {
		...height !== void 0 ? { height } : {},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
			data,
			margin: {
				top: 8,
				right: 8,
				bottom: 0,
				left: -18
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "area-fill",
					x1: "0",
					y1: "0",
					x2: "0",
					y2: "1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "var(--chart-1)",
						stopOpacity: .28
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "var(--chart-1)",
						stopOpacity: 0
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
					stroke: "var(--line)",
					vertical: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					dataKey: xKey,
					...axisProps
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					...axisProps,
					width: 52
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
					cursor: { stroke: "var(--line)" },
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, { ...formatter ? { formatter } : {} })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
					type: "monotone",
					dataKey,
					name,
					stroke: "var(--chart-1)",
					strokeWidth: 2,
					fill: "url(#area-fill)",
					animationDuration: 900
				})
			]
		})
	});
}
function CategoryBarChart({ data, xKey, dataKey, name, height, formatter, horizontal = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, {
		...height !== void 0 ? { height } : {},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
			data,
			layout: horizontal ? "vertical" : "horizontal",
			margin: {
				top: 8,
				right: 8,
				bottom: 0,
				left: horizontal ? 8 : -18
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
					stroke: "var(--line)",
					vertical: horizontal,
					horizontal: !horizontal
				}),
				horizontal ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					type: "number",
					...axisProps
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					type: "category",
					dataKey: xKey,
					...axisProps,
					width: 96
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					dataKey: xKey,
					...axisProps
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					...axisProps,
					width: 52
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
					cursor: { fill: "var(--sand)" },
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, { ...formatter ? { formatter } : {} })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					dataKey,
					name,
					animationDuration: 900,
					radius: 0,
					children: data.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: SERIES[i % SERIES.length] }, i))
				})
			]
		})
	});
}
function DonutChart({ data, height = 240, formatter }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, {
		height,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, { ...formatter ? { formatter } : {} }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
			data,
			dataKey: "value",
			nameKey: "label",
			innerRadius: "58%",
			outerRadius: "86%",
			paddingAngle: 2,
			animationDuration: 900,
			stroke: "var(--admin-surface)",
			children: data.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: SERIES[i % SERIES.length] }, i))
		})] })
	});
}
function ChartLegend({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex flex-wrap gap-x-5 gap-y-2",
		children: items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-center gap-2 text-xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "size-2 shrink-0",
					style: { background: SERIES[i % SERIES.length] }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: item.label
				}),
				item.value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium tabular-nums text-navy",
					children: item.value
				}) : null
			]
		}, item.label))
	});
}
//#endregion
export { TrendChart as a, DonutChart as i, CategoryBarChart as n, ChartLegend as r, AreaTrendChart as t };
