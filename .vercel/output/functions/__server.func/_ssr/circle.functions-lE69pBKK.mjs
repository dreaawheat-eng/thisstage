import { r as createServerFn } from "./ssr.mjs";
import { r as getSql } from "./db-BIJpTQQo.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { n as authMiddleware, r as isTopic } from "./circle-topics-Dem1AvH_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/circle.functions-lE69pBKK.js
var STAGES = /* @__PURE__ */ new Set([
	"p4",
	"p9",
	"p14",
	"p21",
	"p28",
	"p34",
	"p38",
	"b0",
	"b2",
	"b6",
	"b4m",
	"b6m",
	"b9",
	"b15"
]);
function cleanName(value) {
	return value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 24);
}
function cleanBody(value, max) {
	return value.replace(/\s+/g, " ").trim().slice(0, max);
}
function flag(value) {
	return value === true || value === "t" || value === "true" || value === 1;
}
function count(value) {
	const n = typeof value === "number" ? value : Number(value);
	return Number.isFinite(n) ? n : 0;
}
function toPost(row) {
	return {
		id: row.id,
		authorName: row.author_name,
		body: row.body,
		topic: isTopic(row.topic) ? row.topic : "momtip",
		createdAt: row.created_at,
		mine: flag(row.mine),
		likes: count(row.likes),
		liked: flag(row.liked),
		comments: count(row.comments)
	};
}
var listCircle_createServerFn_handler = createServerRpc({
	id: "429beb75b80485f0aa0c4d349fd0b019dc6d5356a34bbef03784654820d1d9e1",
	name: "listCircle",
	filename: "src/lib/circle.functions.ts"
}, (opts) => listCircle.__executeServer(opts));
var listCircle = createServerFn({ method: "GET" }).validator((stageId) => stageId).middleware([authMiddleware]).handler(listCircle_createServerFn_handler, async ({ data: stageId, context }) => {
	if (!STAGES.has(stageId)) return [];
	return (await (await getSql())`
      select p.id, p.author_name, p.body, p.topic, p.created_at::text as created_at,
             (p.user_id = ${context.userId}) as mine,
             (select count(*)::int from circle_likes l where l.post_id = p.id) as likes,
             exists(select 1 from circle_likes l where l.post_id = p.id and l.user_id = ${context.userId}) as liked,
             (select count(*)::int from circle_comments c where c.post_id = p.id) as comments
      from circle_posts p
      where p.stage_id = ${stageId}
      order by p.created_at desc
      limit 50
    `).map(toPost);
});
var postCircle_createServerFn_handler = createServerRpc({
	id: "f054df70b924c5e9361fe8d44a468de2ce49e45230d68f6d668f1fbac9359a7d",
	name: "postCircle",
	filename: "src/lib/circle.functions.ts"
}, (opts) => postCircle.__executeServer(opts));
var postCircle = createServerFn({ method: "POST" }).validator((input) => input).middleware([authMiddleware]).handler(postCircle_createServerFn_handler, async ({ data, context }) => {
	const body = cleanBody(data.body, 280);
	const authorName = cleanName(data.authorName);
	if (!STAGES.has(data.stageId)) return {
		ok: false,
		error: "That stage isn’t open."
	};
	if (!isTopic(data.topic)) return {
		ok: false,
		error: "Pick a topic."
	};
	if (!authorName) return {
		ok: false,
		error: "Add a first name."
	};
	if (!body) return {
		ok: false,
		error: "Write a post first."
	};
	await (await getSql())`
      insert into circle_posts (id, user_id, author_name, stage_id, chips, body, topic)
      values (${crypto.randomUUID()}, ${context.userId}, ${authorName}, ${data.stageId}, '[]', ${body}, ${data.topic})
    `;
	return { ok: true };
});
var toggleLike_createServerFn_handler = createServerRpc({
	id: "af0240ad393674639e5c56ec57f5b9cdc83ed55bfa0d14077b0696ef6c37acc1",
	name: "toggleLike",
	filename: "src/lib/circle.functions.ts"
}, (opts) => toggleLike.__executeServer(opts));
var toggleLike = createServerFn({ method: "POST" }).validator((postId) => postId).middleware([authMiddleware]).handler(toggleLike_createServerFn_handler, async ({ data: postId, context }) => {
	if (!postId || postId.length > 80) return { ok: false };
	const sql = await getSql();
	if ((await sql`
      select post_id from circle_likes where post_id = ${postId} and user_id = ${context.userId}
    `).length > 0) await sql`delete from circle_likes where post_id = ${postId} and user_id = ${context.userId}`;
	else await sql`insert into circle_likes (post_id, user_id) values (${postId}, ${context.userId})`;
	return { ok: true };
});
var listComments_createServerFn_handler = createServerRpc({
	id: "cb169789b899f491a02c2b1f20ae31161d6deab3fc54a9b5a6597b10448b153e",
	name: "listComments",
	filename: "src/lib/circle.functions.ts"
}, (opts) => listComments.__executeServer(opts));
var listComments = createServerFn({ method: "GET" }).validator((postId) => postId).middleware([authMiddleware]).handler(listComments_createServerFn_handler, async ({ data: postId, context }) => {
	if (!postId || postId.length > 80) return [];
	return (await (await getSql())`
      select id, author_name, body, created_at::text as created_at,
             (user_id = ${context.userId}) as mine
      from circle_comments
      where post_id = ${postId}
      order by created_at asc
      limit 40
    `).map((row) => ({
		id: row.id,
		authorName: row.author_name,
		body: row.body,
		createdAt: row.created_at,
		mine: flag(row.mine)
	}));
});
var addComment_createServerFn_handler = createServerRpc({
	id: "c0ad0d8e84dc195d465c5b454a8baf489419078820007cb3e89aed9890f04433",
	name: "addComment",
	filename: "src/lib/circle.functions.ts"
}, (opts) => addComment.__executeServer(opts));
var addComment = createServerFn({ method: "POST" }).validator((input) => input).middleware([authMiddleware]).handler(addComment_createServerFn_handler, async ({ data, context }) => {
	const body = cleanBody(data.body, 200);
	const authorName = cleanName(data.authorName);
	if (!data.postId || data.postId.length > 80) return {
		ok: false,
		error: "That post is gone."
	};
	if (!authorName) return {
		ok: false,
		error: "Add a first name."
	};
	if (!body) return {
		ok: false,
		error: "Write a reply first."
	};
	const sql = await getSql();
	if ((await sql`select id from circle_posts where id = ${data.postId}`).length === 0) return {
		ok: false,
		error: "That post is gone."
	};
	await sql`
      insert into circle_comments (id, post_id, user_id, author_name, body)
      values (${crypto.randomUUID()}, ${data.postId}, ${context.userId}, ${authorName}, ${body})
    `;
	return { ok: true };
});
var deleteCircle_createServerFn_handler = createServerRpc({
	id: "31b3160ec23644f14642929d1a1f68dd253b181f4e54ecbd10584d5d3d4a3d1a",
	name: "deleteCircle",
	filename: "src/lib/circle.functions.ts"
}, (opts) => deleteCircle.__executeServer(opts));
var deleteCircle = createServerFn({ method: "POST" }).validator((id) => id).middleware([authMiddleware]).handler(deleteCircle_createServerFn_handler, async ({ data: id, context }) => {
	if (!id || id.length > 80) return;
	const sql = await getSql();
	if ((await sql`
      select id from circle_posts where id = ${id} and user_id = ${context.userId}
    `).length === 0) return;
	await sql`delete from circle_comments where post_id = ${id}`;
	await sql`delete from circle_likes where post_id = ${id}`;
	await sql`delete from circle_posts where id = ${id} and user_id = ${context.userId}`;
});
var deleteComment_createServerFn_handler = createServerRpc({
	id: "35b56889008f21be2b8a80811a427855798cfb28cb62998918982c1a23176e63",
	name: "deleteComment",
	filename: "src/lib/circle.functions.ts"
}, (opts) => deleteComment.__executeServer(opts));
var deleteComment = createServerFn({ method: "POST" }).validator((id) => id).middleware([authMiddleware]).handler(deleteComment_createServerFn_handler, async ({ data: id, context }) => {
	if (!id || id.length > 80) return;
	await (await getSql())`delete from circle_comments where id = ${id} and user_id = ${context.userId}`;
});
//#endregion
export { addComment_createServerFn_handler, deleteCircle_createServerFn_handler, deleteComment_createServerFn_handler, listCircle_createServerFn_handler, listComments_createServerFn_handler, postCircle_createServerFn_handler, toggleLike_createServerFn_handler };
