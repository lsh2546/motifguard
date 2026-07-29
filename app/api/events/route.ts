import { env } from "cloudflare:workers";
import { NextResponse } from "next/server";

const validTypes = new Set(["visit", "sample_run", "analysis_completed", "analysis_failed", "feedback"]);

async function setup() {
  await env.DB.batch([
    env.DB.prepare("CREATE TABLE IF NOT EXISTS visitors (visitor_id TEXT PRIMARY KEY, first_seen TEXT NOT NULL, last_seen TEXT NOT NULL, visit_count INTEGER NOT NULL DEFAULT 1)"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, visitor_id TEXT NOT NULL, event_type TEXT NOT NULL, detail TEXT, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)"),
    env.DB.prepare("CREATE INDEX IF NOT EXISTS events_type_idx ON events(event_type)"),
  ]);
}

export async function POST(request: Request) {
  try {
    await setup();
    const body = await request.json() as { type?: string; visitorId?: string; detail?: string };
    if (!body.type || !validTypes.has(body.type) || !body.visitorId || !/^[a-f0-9-]{20,64}$/i.test(body.visitorId)) return NextResponse.json({ error: "Invalid event." }, { status: 400 });
    const now = new Date().toISOString();
    if (body.type === "visit") {
      await env.DB.prepare("INSERT INTO visitors(visitor_id, first_seen, last_seen, visit_count) VALUES(?, ?, ?, 1) ON CONFLICT(visitor_id) DO UPDATE SET last_seen=excluded.last_seen, visit_count=visit_count+1").bind(body.visitorId, now, now).run();
    }
    await env.DB.prepare("INSERT INTO events(visitor_id, event_type, detail) VALUES(?, ?, ?)").bind(body.visitorId, body.type, body.detail?.slice(0, 700) || null).run();
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Metrics are temporarily unavailable." }, { status: 503 }); }
}

export async function GET() {
  try {
    await setup();
    const [visitors, visits, analyses, feedback] = await env.DB.batch([
      env.DB.prepare("SELECT COUNT(*) AS value FROM visitors"),
      env.DB.prepare("SELECT COUNT(*) AS value FROM events WHERE event_type='visit'"),
      env.DB.prepare("SELECT COUNT(*) AS value FROM events WHERE event_type='analysis_completed'"),
      env.DB.prepare("SELECT COUNT(*) AS value FROM events WHERE event_type='feedback'"),
    ]);
    const value = (result: D1Result) => Number((result.results?.[0] as { value?: number })?.value || 0);
    return NextResponse.json({ visitors: value(visitors), visits: value(visits), analyses: value(analyses), feedback: value(feedback) }, { headers: { "Cache-Control": "no-store" } });
  } catch { return NextResponse.json({ visitors: 0, visits: 0, analyses: 0, feedback: 0 }); }
}
