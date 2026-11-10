import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { isTopic, type TopicId } from "@/lib/circle-topics";

const STAGES = new Set([
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
  "b15",
]);

export type CirclePost = {
  id: string;
  authorName: string;
  body: string;
  topic: TopicId;
  createdAt: string;
  mine: boolean;
  likes: number;
  liked: boolean;
  comments: number;
};

export type CircleComment = {
  id: string;
  authorName: string;
  body: string;
  createdAt: string;
  mine: boolean;
};

type PostRow = {
  id: string;
  author_name: string;
  body: string;
  topic: string;
  created_at: string;
  mine: boolean | string | number;
  likes: number | string;
  liked: boolean | string | number;
  comments: number | string;
};

type CommentRow = {
  id: string;
  author_name: string;
  body: string;
  created_at: string;
  mine: boolean | string | number;
};

function cleanName(value: string): string {
  return value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 24);
}

function cleanBody(value: string, max: number): string {
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

function flag(value: boolean | string | number): boolean {
  return value === true || value === "t" || value === "true" || value === 1;
}

function count(value: number | string): number {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
}

function toPost(row: PostRow): CirclePost {
  return {
    id: row.id,
    authorName: row.author_name,
    body: row.body,
    topic: isTopic(row.topic) ? row.topic : "momtip",
    createdAt: row.created_at,
    mine: flag(row.mine),
    likes: count(row.likes),
    liked: flag(row.liked),
    comments: count(row.comments),
  };
}

export const listCircle = createServerFn({ method: "GET" })
  .validator((stageId: string) => stageId)
  .middleware([authMiddleware])
  .handler(async ({ data: stageId, context }) => {
    if (!STAGES.has(stageId)) return [] as CirclePost[];
    const sql = await getSql();
    const rows = await sql<PostRow>`
      select p.id, p.author_name, p.body, p.topic, p.created_at::text as created_at,
             (p.user_id = ${context.userId}) as mine,
             (select count(*)::int from circle_likes l where l.post_id = p.id) as likes,
             exists(select 1 from circle_likes l where l.post_id = p.id and l.user_id = ${context.userId}) as liked,
             (select count(*)::int from circle_comments c where c.post_id = p.id) as comments
      from circle_posts p
      where p.stage_id = ${stageId}
      order by p.created_at desc
      limit 50
    `;
    return rows.map(toPost);
  });

export const postCircle = createServerFn({ method: "POST" })
  .validator((input: { stageId: string; body: string; authorName: string; topic: string }) => input)
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const body = cleanBody(data.body, 280);
    const authorName = cleanName(data.authorName);
    if (!STAGES.has(data.stageId)) return { ok: false as const, error: "That stage isn’t open." };
    if (!isTopic(data.topic)) return { ok: false as const, error: "Pick a topic." };
    if (!authorName) return { ok: false as const, error: "Add a first name." };
    if (!body) return { ok: false as const, error: "Write a post first." };
    const sql = await getSql();
    await sql`
      insert into circle_posts (id, user_id, author_name, stage_id, chips, body, topic)
      values (${crypto.randomUUID()}, ${context.userId}, ${authorName}, ${data.stageId}, '[]', ${body}, ${data.topic})
    `;
    return { ok: true as const };
  });

export const toggleLike = createServerFn({ method: "POST" })
  .validator((postId: string) => postId)
  .middleware([authMiddleware])
  .handler(async ({ data: postId, context }) => {
    if (!postId || postId.length > 80) return { ok: false as const };
    const sql = await getSql();
    const existing = await sql<{ post_id: string }>`
      select post_id from circle_likes where post_id = ${postId} and user_id = ${context.userId}
    `;
    if (existing.length > 0) {
      await sql`delete from circle_likes where post_id = ${postId} and user_id = ${context.userId}`;
    } else {
      await sql`insert into circle_likes (post_id, user_id) values (${postId}, ${context.userId})`;
    }
    return { ok: true as const };
  });

export const listComments = createServerFn({ method: "GET" })
  .validator((postId: string) => postId)
  .middleware([authMiddleware])
  .handler(async ({ data: postId, context }) => {
    if (!postId || postId.length > 80) return [] as CircleComment[];
    const sql = await getSql();
    const rows = await sql<CommentRow>`
      select id, author_name, body, created_at::text as created_at,
             (user_id = ${context.userId}) as mine
      from circle_comments
      where post_id = ${postId}
      order by created_at asc
      limit 40
    `;
    return rows.map((row) => ({
      id: row.id,
      authorName: row.author_name,
      body: row.body,
      createdAt: row.created_at,
      mine: flag(row.mine),
    }));
  });

export const addComment = createServerFn({ method: "POST" })
  .validator((input: { postId: string; body: string; authorName: string }) => input)
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const body = cleanBody(data.body, 200);
    const authorName = cleanName(data.authorName);
    if (!data.postId || data.postId.length > 80) return { ok: false as const, error: "That post is gone." };
    if (!authorName) return { ok: false as const, error: "Add a first name." };
    if (!body) return { ok: false as const, error: "Write a reply first." };
    const sql = await getSql();
    const found = await sql<{ id: string }>`select id from circle_posts where id = ${data.postId}`;
    if (found.length === 0) return { ok: false as const, error: "That post is gone." };
    await sql`
      insert into circle_comments (id, post_id, user_id, author_name, body)
      values (${crypto.randomUUID()}, ${data.postId}, ${context.userId}, ${authorName}, ${body})
    `;
    return { ok: true as const };
  });

export const deleteCircle = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .middleware([authMiddleware])
  .handler(async ({ data: id, context }) => {
    if (!id || id.length > 80) return;
    const sql = await getSql();
    const owned = await sql<{ id: string }>`
      select id from circle_posts where id = ${id} and user_id = ${context.userId}
    `;
    if (owned.length === 0) return;
    await sql`delete from circle_comments where post_id = ${id}`;
    await sql`delete from circle_likes where post_id = ${id}`;
    await sql`delete from circle_posts where id = ${id} and user_id = ${context.userId}`;
  });

export const deleteComment = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .middleware([authMiddleware])
  .handler(async ({ data: id, context }) => {
    if (!id || id.length > 80) return;
    const sql = await getSql();
    await sql`delete from circle_comments where id = ${id} and user_id = ${context.userId}`;
  });
