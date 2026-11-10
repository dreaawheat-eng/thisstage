import { createServerFn } from "@tanstack/react-start";
import { catalogProduct } from "@/lib/products.functions";
import { amazonSearch } from "@/lib/shops";

export type MomProduct = { name: string; image: string; href: string };
export type MomVideo = { title: string; url: string; image: string };
export type MomReply = { reply: string; products: MomProduct[]; video: MomVideo | null };

type Listed = { name: string; image: string; query: string };

const videoCache = new Map<string, MomVideo | null>();

function clip(value: unknown, max: number) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

export const askMom = createServerFn({ method: "POST" })
  .validator((input: {
    messages?: { role?: string; text?: string }[];
    stage?: string;
    about?: string;
    products?: { name?: string; image?: string; query?: string }[];
  }) => {
    return {
      messages: (input.messages ?? [])
        .slice(-6)
        .map((turn) => ({
          role: turn.role === "assistant" ? ("assistant" as const) : ("user" as const),
          text: clip(turn.text, 500),
        }))
        .filter((turn) => turn.text),
      stage: clip(input.stage, 80),
      about: clip(input.about, 320),
      products: (input.products ?? [])
        .map((item) => ({
          name: clip(item?.name, 120),
          image: clip(item?.image, 500),
          query: clip(item?.query, 160),
        }))
        .filter((item) => item.name)
        .slice(0, 8),
    };
  })
  .handler(async ({ data }) => {
    if (!data.messages.length || data.messages[data.messages.length - 1]?.role !== "user") {
      return { ok: false as const, error: "Ask a question first." };
    }
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "Sage AI Mom isn’t available right now." };
    const system = [
      "You are Sage AI Mom on ThisStage. You have been through pregnancy and the early years.",
      "Sound warm, short, and specific. Like a text from a friend who has done this. Not a blog. Not cutesy. Do not say mama, journey, or algorithm.",
      "This is general information, not medical advice. No doses. Never say a baby should hit a milestone. If they describe an emergency, tell them to contact their own clinician or emergency care.",
      "Recommend at most two products, and only names from the product list. If none fit, recommend none.",
      "If a short video would help, set video. Otherwise video is null.",
      'Reply with JSON only: {"reply":"","products":[],"video":null}',
      'video shape when used: {"title":"short title","search":"youtube search phrase"}',
    ].join(" ");
    const brief = `Stage: ${data.stage || "unknown"}. ${data.about} Products you may name: ${data.products.map((item) => item.name).join("; ") || "none"}.`;
    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        signal: AbortSignal.timeout(25000),
        body: JSON.stringify({
          model: "grok-4.5",
          max_tokens: 350,
          temperature: 0.5,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: system },
            { role: "system", content: brief },
            ...data.messages.map((turn) => ({ role: turn.role, content: turn.text })),
          ],
        }),
      });
      if (!res.ok) return { ok: false as const, error: "She couldn’t answer just now. Try again in a minute." };
      const answer = parseMom((await res.json()).choices?.[0]?.message?.content ?? "", data.products);
      if (answer.videoSearch) answer.video = await lookupVideo(answer.videoSearch, answer.video?.title);
      const { videoSearch: _search, ...clean } = answer;
      return { ok: true as const, answer: clean };
    } catch {
      return { ok: false as const, error: "She couldn’t answer just now. Try again in a minute." };
    }
  });

function parseMom(raw: string, allowed: Listed[]): MomReply & { videoSearch?: string } {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  let reply = raw.trim();
  let products: MomProduct[] = [];
  let video: MomVideo | null = null;
  let videoSearch = "";
  if (start >= 0 && end > start) {
    try {
      const parsed = JSON.parse(raw.slice(start, end + 1)) as {
        reply?: string;
        products?: string[];
        video?: { title?: string; search?: string } | null;
      };
      reply = clip(parsed.reply, 700) || reply;
      products = (parsed.products ?? [])
        .map((name) => clip(name, 120))
        .map((name) => allowed.find((item) => item.name.toLowerCase() === name.toLowerCase()))
        .filter((item): item is Listed => Boolean(item))
        .slice(0, 2)
        .map((item) => {
          const catalog = catalogProduct(item.query || item.name);
          const image = catalog?.image || item.image;
          const href = catalog?.href || amazonSearch(item.name);
          return { name: catalog?.title || item.name, image, href };
        });
      videoSearch = clip(parsed.video?.search, 80);
      if (videoSearch) video = { title: clip(parsed.video?.title, 80) || "A short watch", url: "", image: "" };
    } catch {
      reply = raw.trim().slice(0, 700);
    }
  }
  return { reply: reply || "I didn’t catch that. Ask it one more time?", products, video, videoSearch };
}

async function lookupVideo(search: string, fallbackTitle?: string): Promise<MomVideo | null> {
  if (videoCache.has(search)) return videoCache.get(search) ?? null;
  try {
    const res = await fetch(`https://www.youtube.com/results?search_query=${encodeURIComponent(search)}`, {
      headers: { "User-Agent": "Mozilla/5.0" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      videoCache.set(search, null);
      return null;
    }
    const html = await res.text();
    const re = /"videoId":"([a-zA-Z0-9_-]{11})"/g;
    let match: RegExpExecArray | null;
    let id = "";
    while ((match = re.exec(html))) {
      if (!html.slice(match.index, match.index + 2200).includes("lengthText")) continue;
      id = match[1];
      break;
    }
    if (!id) {
      videoCache.set(search, null);
      return null;
    }
    const video = {
      title: fallbackTitle || "A short watch",
      url: `https://www.youtube.com/watch?v=${id}`,
      image: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    };
    videoCache.set(search, video);
    return video;
  } catch {
    videoCache.set(search, null);
    return null;
  }
}
