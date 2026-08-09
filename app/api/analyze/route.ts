import { env } from "cloudflare:workers";
import { NextResponse } from "next/server";
import { hasValidAuditContract } from "@/lib/audit-contract.mjs";

const allowed = new Set(["image/png", "image/jpeg", "image/webp"]);
const maxBytes = 8_000_000;
const prompt = `You are MotifGuard, an automotive design intent auditor. Image 1 is a source car design sketch. Image 2 is an AI-generated automotive render derived from it. Compare visible evidence only. Identify what was preserved, drifted, or lost across proportion, silhouette, character lines, graphics, surface tension, and distinctive identity. Do not infer engineering performance. Return JSON only with this shape: {"score":85,"verdict":"one sentence","intent":"one sentence","evidence":[{"feature":"short name","status":"preserved|drifted|lost","sourceEvidence":"visible evidence","resultEvidence":"visible evidence","reason":"why it matters","confidence":0.95}],"brief":"actionable revision brief","promptPatch":"copy-ready generation prompt"}. The overall score must be a finite number from 0 through 100 inclusive, where 0 means no intent fidelity and 100 means complete intent fidelity. Do not return the overall score as a 0-to-1 normalized fraction. Evidence confidence uses a separate contract: every confidence must be a finite number from 0 through 1 inclusive. Return exactly four evidence items and use at least two different status values.`;

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Send the source sketch and AI render as multipart form data." }, { status: 400 });
  }
  try {
    const source = form.get("source");
    const result = form.get("result");
    if (!(source instanceof File) || !(result instanceof File)) return NextResponse.json({ error: "Upload both a source sketch and an AI render." }, { status: 400 });
    for (const file of [source, result]) {
      if (!allowed.has(file.type)) return NextResponse.json({ error: "Only PNG, JPG, and WebP images are supported." }, { status: 415 });
      if (file.size > maxBytes) return NextResponse.json({ error: "Each image must be 8 MB or smaller." }, { status: 413 });
    }
    const runtimeEnv = env as unknown as { GEMINI_API_KEY?: string; GEMMA_MODEL?: string };
    const apiKey = runtimeEnv.GEMINI_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "Live AI is being connected. Please try the verified sample for now." }, { status: 503 });
    const encode = async (file: File) => Buffer.from(await file.arrayBuffer()).toString("base64");
    const model = runtimeEnv.GEMMA_MODEL || "gemma-4-26b-a4b-it";
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey }, signal: AbortSignal.timeout(60_000),
      body: JSON.stringify({ contents: [{ role: "user", parts: [
        { inlineData: { mimeType: source.type, data: await encode(source) } }, { text: "IMAGE 1 - SOURCE SKETCH" },
        { inlineData: { mimeType: result.type, data: await encode(result) } }, { text: `IMAGE 2 - AI RENDER\n\n${prompt}` },
      ] }], generationConfig: { responseMimeType: "application/json", temperature: 0.2 } }),
    });
    if (!response.ok) return NextResponse.json({ error: response.status === 429 ? "The free AI limit is temporarily busy. Please retry shortly." : "The AI analysis did not complete. Please retry." }, { status: response.status === 429 ? 429 : 502 });
    const payload = await response.json() as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
    const text = payload.candidates?.[0]?.content?.parts?.find(part => part.text)?.text;
    if (!text) throw new Error("empty response");
    const parsed = JSON.parse(text);
    if (!hasValidAuditContract(parsed)) throw new Error("invalid score or confidence contract");
    return NextResponse.json({ ...parsed, mode: "live", model, generatedAt: new Date().toISOString(), requestId: crypto.randomUUID() });
  } catch (cause) {
    const name = cause && typeof cause === "object" && "name" in cause ? String(cause.name) : "";
    if (name === "TimeoutError" || name === "AbortError") {
      return NextResponse.json({ error: "The AI analysis timed out. Please retry." }, { status: 504 });
    }
    return NextResponse.json({ error: "The AI returned an invalid result. Please retry with clearer images." }, { status: 502 });
  }
}
