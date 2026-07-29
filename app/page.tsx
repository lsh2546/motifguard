"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

type Evidence = { feature: string; status: "preserved" | "drifted" | "lost"; sourceEvidence: string; resultEvidence: string; reason: string; confidence: number };
type Audit = { score: number; verdict: string; intent: string; evidence: Evidence[]; brief: string; promptPatch: string; mode?: string; model?: string };
type Metrics = { visitors: number; visits: number; analyses: number; feedback: number };
type Upload = { file: File | null; url: string | null };

const sampleAudit: Audit = {
  score: 78,
  verdict: "The silhouette survived, but the signature rear tension did not.",
  intent: "A low electric grand tourer defined by a rising rear shoulder, cab-rearward balance, and a calm lower-body gesture.",
  evidence: [
    { feature: "Cab-rearward proportion", status: "preserved", sourceEvidence: "Short front overhang and greenhouse peak behind the midpoint", resultEvidence: "The render keeps the same visual weight distribution", reason: "The primary stance remains legible.", confidence: .96 },
    { feature: "Rising shoulder", status: "drifted", sourceEvidence: "The sketch climbs decisively through the rear quarter", resultEvidence: "The render resolves the line almost horizontally", reason: "The flatter transition weakens forward motion.", confidence: .93 },
    { feature: "Lower graphic", status: "preserved", sourceEvidence: "One dark gesture connects both wheel volumes", resultEvidence: "The rocker treatment repeats that direction", reason: "The secondary graphic still supports the body gesture.", confidence: .89 },
    { feature: "Rear taper", status: "lost", sourceEvidence: "The sketch narrows sharply behind the rear wheel", resultEvidence: "The render enlarges and rounds the tail", reason: "An ownable feature becomes a conventional GT volume.", confidence: .86 },
  ],
  brief: "Keep the cab position and lower blade. Restore the upward rear-quarter tension and reduce tail volume.",
  promptPatch: "Preserve the original rising shoulder line and sharp rear taper; do not flatten the upper-body gesture or inflate the rear mass.",
  mode: "sample",
  model: "curated example",
};

const emptyMetrics = { visitors: 0, visits: 0, analyses: 0, feedback: 0 };

export default function Home() {
  const [source, setSource] = useState<Upload>({ file: null, url: null });
  const [result, setResult] = useState<Upload>({ file: null, url: null });
  const [audit, setAudit] = useState<Audit | null>(null);
  const [sample, setSample] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [metrics, setMetrics] = useState<Metrics>(emptyMetrics);
  const [feedback, setFeedback] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);
  const sourceRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLInputElement>(null);

  function visitorId() {
    const key = "motifguard-visitor";
    let id = localStorage.getItem(key);
    if (!id) { id = crypto.randomUUID(); localStorage.setItem(key, id); }
    return id;
  }

  async function record(type: string, detail?: string) {
    try {
      await fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type, visitorId: visitorId(), detail }) });
      const response = await fetch("/api/events", { cache: "no-store" });
      if (response.ok) setMetrics(await response.json());
    } catch { /* analytics never blocks the product */ }
  }

  useEffect(() => {
    const key = "motifguard-visitor";
    let id = localStorage.getItem(key);
    if (!id) { id = crypto.randomUUID(); localStorage.setItem(key, id); }
    void fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "visit", visitorId: id }) })
      .then(() => fetch("/api/events", { cache: "no-store" }))
      .then(response => response.ok ? response.json() : null)
      .then(data => { if (data) setMetrics(data); })
      .catch(() => undefined);
  }, []);

  function choose(setter: (upload: Upload) => void) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
      if (!["image/png", "image/jpeg", "image/webp"].includes(file.type) || file.size > 8_000_000) {
        setError("Use a PNG, JPG, or WebP image no larger than 8 MB.");
        return;
      }
      setter({ file, url: URL.createObjectURL(file) });
      setSample(false); setAudit(null); setError(""); setFeedbackSent(false);
    };
  }

  function loadSample() {
    setSource({ file: null, url: "/og.webp" }); setResult({ file: null, url: "/og.webp" });
    setSample(true); setAudit(null); setError(""); setFeedbackSent(false);
  }

  async function runAudit() {
    if (!source.url || !result.url) return;
    setLoading(true); setAudit(null); setError("");
    try {
      if (sample) {
        setAudit(sampleAudit); await record("sample_run");
      } else {
        const body = new FormData();
        body.append("source", source.file!); body.append("result", result.file!);
        const response = await fetch("/api/analyze", { method: "POST", body });
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || "The analysis could not be completed.");
        setAudit(payload); await record("analysis_completed");
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The analysis could not be completed.");
      await record("analysis_failed");
    } finally { setLoading(false); }
  }

  async function sendFeedback(rating: "helpful" | "not_helpful") {
    await record("feedback", JSON.stringify({ rating, comment: feedback.slice(0, 500) }));
    setFeedbackSent(true);
  }

  const ready = Boolean(source.url && result.url);
  return <main>
    <nav><a className="brand" href="#top"><span>M/</span>MOTIFGUARD</a><a href="#evidence">LIVE EVIDENCE</a></nav>
    <header id="top">
      <p className="kicker">AI AUTOMOTIVE DESIGN INTENT AUDITOR</p>
      <h1>See what your AI render <em>kept, changed, and lost.</em></h1>
      <p className="lede">Upload a source sketch and its generated render. MotifGuard compares visible design evidence, scores intent fidelity, and gives you a precise next-iteration prompt.</p>
      <button className="secondary" onClick={loadSample}>TRY THE 30-SECOND EXAMPLE</button>
    </header>

    <section className="studio">
      <div className="sectionHead"><span>01 / COMPARE</span><span>{ready ? "TWO VIEWS READY" : "ADD TWO VIEWS"}</span></div>
      <div className="compareGrid">
        {[["A", "SOURCE SKETCH", source, sourceRef, setSource], ["B", "AI RENDER", result, resultRef, setResult]].map(([index, title, upload, ref, setter]) => {
          const item = upload as Upload; const input = ref as React.RefObject<HTMLInputElement | null>;
          return <div className="uploadCard" key={title as string}>
            <div className="cardLabel"><span>{index as string}</span><strong>{title as string}</strong></div>
            <button className="imageSlot" onClick={() => input.current?.click()} aria-label={`Upload ${title}`}>
              {item.url ? <>
                {/* User-selected object URLs are intentionally rendered directly. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt={title as string} />
              </> : <span>DROP OR BROWSE<br /><small>PNG / JPG / WEBP · MAX 8 MB</small></span>}
            </button>
            <input ref={input} hidden type="file" accept="image/png,image/jpeg,image/webp" onChange={choose(setter as (upload: Upload) => void)} />
          </div>;
        })}
      </div>
      <button className="auditButton" disabled={!ready || loading} onClick={runAudit}>{loading ? "COMPARING VISUAL EVIDENCE..." : "ANALYZE DESIGN INTENT"}</button>
      <p className="privacy">Images are sent only for the requested analysis and are not stored by MotifGuard. Anonymous usage metrics never include image contents or filenames.</p>
    </section>

    <section className="results">
      <div className="sectionHead"><span>02 / RESULT</span><span>{audit ? `${audit.mode === "sample" ? "CURATED SAMPLE" : "LIVE AI"} · ${audit.model}` : "WAITING"}</span></div>
      {error && <div className="errorState"><strong>ANALYSIS UNAVAILABLE</strong><p>{error}</p><button onClick={loadSample}>OPEN VERIFIED SAMPLE</button></div>}
      {!audit && !error && <div className="emptyState">Your evidence-backed audit will appear here.</div>}
      {audit && <div className="audit">
        <aside><p>INTENT FIDELITY</p><strong className="score">{audit.score}<small>/100</small></strong><h2>{audit.verdict}</h2><p>{audit.intent}</p></aside>
        <div className="evidenceList">{audit.evidence.map(item => <article key={item.feature}><span className={item.status}>{item.status}</span><h3>{item.feature} · {Math.round(item.confidence * 100)}%</h3><p><b>Sketch:</b> {item.sourceEvidence}</p><p><b>Render:</b> {item.resultEvidence}</p><p>{item.reason}</p></article>)}</div>
        <div className="actions"><h3>NEXT ITERATION</h3><p>{audit.brief}</p><h3>PROMPT PATCH</h3><p>{audit.promptPatch}</p></div>
        <div className="feedback"><h3>Was this analysis useful?</h3><textarea value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="Optional feedback (500 characters)" maxLength={500} />
          {feedbackSent ? <p>Thank you. Your feedback was recorded.</p> : <div><button onClick={() => sendFeedback("helpful")}>YES, HELPFUL</button><button onClick={() => sendFeedback("not_helpful")}>NOT YET</button></div>}
        </div>
      </div>}
    </section>

    <section className="metrics" id="evidence">
      <div><p>UNIQUE VISITORS</p><strong>{metrics.visitors}</strong></div>
      <div><p>VISITS</p><strong>{metrics.visits}</strong></div>
      <div><p>LIVE ANALYSES</p><strong>{metrics.analyses}</strong></div>
      <div><p>FEEDBACK</p><strong>{metrics.feedback}</strong></div>
      <small>Public, automatically recorded launch metrics. Sample runs are excluded from live analyses.</small>
    </section>
    <footer><span>MOTIFGUARD / BUILT WITH GEMMA 4</span><span>CAR DESIGN V1</span><span>HUMAN JUDGMENT STAYS IN THE LOOP</span></footer>
  </main>;
}
