const KEY = "gf_estimator";

export function loadDraft() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

export function saveDraft(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function clearDraft() {
  localStorage.removeItem(KEY);
}

export function captureAttribution() {
  const p = new URLSearchParams(window.location.search);
  const referrer = document.referrer || "";
  const hasUtm = p.get("utm_source") || p.get("utm_medium") || p.get("utm_campaign");
  return {
    utm_source: p.get("utm_source") || "",
    utm_medium: p.get("utm_medium") || "",
    utm_campaign: p.get("utm_campaign") || "",
    utm_term: p.get("utm_term") || "",
    utm_content: p.get("utm_content") || "",
    referrer,
    landing_page: window.location.pathname,
    lead_source: hasUtm ? "paid" : "website"
  };
}