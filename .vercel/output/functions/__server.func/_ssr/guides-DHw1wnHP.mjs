import { x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as SitePage } from "./site-DlLjnZrF.mjs";
import { t as GUIDES } from "./guides-Z8PDrDoW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guides-DHw1wnHP.js
var import_jsx_runtime = require_jsx_runtime();
function Guides() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SitePage, {
		title: "Guides",
		lede: "Short notes for parents. One stage at a time.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-5",
			children: GUIDES.map((guide) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/guides/$slug",
				params: { slug: guide.slug },
				className: "font-medium text-ink underline",
				children: guide.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted",
				children: guide.lede
			})] }, guide.slug))
		})
	});
}
//#endregion
export { Guides as component };
