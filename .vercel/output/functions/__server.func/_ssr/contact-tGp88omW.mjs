import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as SitePage, t as CONTACT_EMAIL } from "./site-DlLjnZrF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-tGp88omW.js
var import_jsx_runtime = require_jsx_runtime();
function Contact() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SitePage, {
		title: "Contact",
		lede: "Questions about the guide, your account, or a link that looks wrong.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Email",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "text-terra underline",
					href: `mailto:${CONTACT_EMAIL}`,
					children: CONTACT_EMAIL
				}),
				". We read it. We do not use this address for medical advice."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "ThisStage is for parents in the United States. If you write about a child’s health, contact your own clinician first." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Draft address for now. Replace ",
					CONTACT_EMAIL,
					" with an inbox you actually check before you send this site to Amazon, Walmart, or Target."
				]
			})
		]
	});
}
//#endregion
export { Contact as component };
