// Autonomous memory logger — appends a step to the SopLog entity so the
// system builds a permanent, queryable record of everything it does.
// Best-effort: never throws, so it can never break the calling operation.
export async function logStep(base44, entry: {
  category?: string;
  action: string;
  detail?: string;
  meta?: string;
  source?: string;
}) {
  try {
    await base44.asServiceRole.entities.SopLog.create({
      category: entry.category || "ops",
      action: entry.action,
      detail: (entry.detail || "").slice(0, 1000),
      meta: entry.meta || "",
      source: entry.source || "system",
    });
  } catch {
    // Swallow — logging must never interrupt the primary operation.
  }
}