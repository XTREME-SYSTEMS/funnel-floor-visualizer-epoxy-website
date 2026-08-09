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
  return {
    utm_source: p.get("utm_source") || "",
    utm_campaign: p.get("utm_campaign") || "",
    landing_page: window.location.pathname,
    lead_source: p.get("utm_source") ? "paid" : "website"
  };
}