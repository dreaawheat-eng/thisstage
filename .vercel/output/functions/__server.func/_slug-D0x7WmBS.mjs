import { x as require_jsx_runtime, y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as Route$1 } from "./_ssr/router-DLZ-t2Wr.mjs";
import { n as SitePage } from "./_ssr/site-DlLjnZrF.mjs";
import { n as guideBySlug } from "./_ssr/guides-Z8PDrDoW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-D0x7WmBS.js
var import_jsx_runtime = require_jsx_runtime();
function GuidePage() {
	const { slug } = Route$1.useParams();
	const guide = guideBySlug(slug);
	if (!guide) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SitePage, {
		title: "That page is gone",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/guides",
			className: "underline",
			children: "Back to the guides"
		}) })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SitePage, {
		title: guide.title,
		lede: guide.lede,
		children: [guide.paragraphs.map((paragraph) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: paragraph }, paragraph)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/guides",
			className: "text-sm text-terra underline",
			children: "All guides"
		}) })]
	});
}
//#endregion
export { GuidePage as component };
