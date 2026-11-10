import { x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-DlLjnZrF.js
var import_jsx_runtime = require_jsx_runtime();
var CONTACT_EMAIL = "hello@thisstage.app";
var NAV = [
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/guides",
		label: "Guides"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function SitePage({ title, lede, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-cream text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mx-auto flex max-w-2xl items-center justify-between gap-4 px-5 py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "font-display text-2xl text-ink",
					children: "ThisStage"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex gap-4 text-sm",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: "text-ink",
						children: item.label
					}, item.to))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-2xl px-5 pb-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl leading-tight text-ink",
						children: title
					}),
					lede ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-lg leading-relaxed text-muted",
						children: lede
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 space-y-4 text-base leading-relaxed",
						children
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mx-auto max-w-2xl space-y-3 px-5 pb-10 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "General info, not medical advice. Ask your provider about your pregnancy or child." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/privacy",
						className: "underline",
						children: "Privacy"
					}),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/disclosure",
						className: "underline",
						children: "Affiliate disclosure"
					}),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "underline",
						children: "Open the app"
					})
				] })]
			})
		]
	});
}
//#endregion
export { SitePage as n, CONTACT_EMAIL as t };
