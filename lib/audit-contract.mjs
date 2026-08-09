const inRange = (value, minimum, maximum) =>
  typeof value === "number" && Number.isFinite(value) && value >= minimum && value <= maximum;

const isText = value => typeof value === "string" && value.trim().length > 0;

export function hasValidAuditContract(value) {
  if (!value || typeof value !== "object") return false;
  const audit = value;
  if (!inRange(audit.score, 0, 100)
    || !isText(audit.verdict) || !isText(audit.intent)
    || !isText(audit.brief) || !isText(audit.promptPatch)
    || !Array.isArray(audit.evidence) || audit.evidence.length !== 4) return false;

  const features = new Set();
  const valid = audit.evidence.every(item => {
    if (!item || typeof item !== "object") return false;
    const feature = isText(item.feature) ? item.feature.trim().toLowerCase() : "";
    if (!feature || features.has(feature)) return false;
    features.add(feature);
    return ["preserved", "drifted", "lost"].includes(String(item.status))
      && inRange(item.confidence, 0, 1)
      && isText(item.sourceEvidence) && isText(item.resultEvidence) && isText(item.reason);
  });

  return valid && new Set(audit.evidence.map(item => String(item.status))).size >= 2;
}
