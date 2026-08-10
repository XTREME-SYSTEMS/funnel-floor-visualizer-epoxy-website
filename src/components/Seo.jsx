import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SEO_ROUTES, DEFAULT_SEO, buildJsonLd, SITE_URL } from "@/lib/seoConfig";
import { base44 } from "@/api/base44Client";

// Module-level cache so we fetch AI-optimized overrides once per session.
let overridesCache = null;
let overridesPromise = null;
async function loadOverrides() {
  if (overridesCache) return overridesCache;
  if (!overridesPromise) {
    overridesPromise = base44.entities.SeoContent.list(200)
      .then((rows) => {
        overridesCache = {};
        for (const r of rows) overridesCache[r.route] = r;
        return overridesCache;
      })
      .catch(() => (overridesCache = {}));
  }
  return overridesPromise;
}

// Allow the admin dashboard to bust the cache after running the optimizer.
export function bustSeoOverrides() {
  overridesCache = null;
  overridesPromise = null;
}

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${CSS.escape(key)}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function clearJsonLd() {
  document.head.querySelectorAll('script[data-seo="jsonld"]').forEach((s) => s.remove());
}

// Route-aware SEO: applies matching meta tags + JSON-LD, with AI-optimized
// overrides from the SeoContent entity layered on top of the static config.
export default function RouteSeo() {
  const location = useLocation();
  const [overrides, setOverrides] = useState(null);

  useEffect(() => {
    loadOverrides().then(setOverrides);
  }, []);

  useEffect(() => {
    if (!overrides) return;
    const path = location.pathname;
    let cfg = SEO_ROUTES[path];
    if (!cfg) {
      const dynKey = Object.keys(SEO_ROUTES).find(
        (k) => k.includes(":") && path.startsWith(k.split(":")[0])
      );
      cfg = dynKey ? SEO_ROUTES[dynKey] : DEFAULT_SEO;
    }

    // Layer AI-optimized overrides on top of the static config.
    const ov = overrides[path];
    const title = (ov && ov.title) || cfg.title || DEFAULT_SEO.title;
    const desc = (ov && ov.description) || cfg.description || DEFAULT_SEO.description;
    const image = cfg.image || DEFAULT_SEO.image;
    const faq = (ov && ov.faq && ov.faq.length) ? ov.faq : cfg.faq;
    const merged = { ...cfg, title, description: desc, faq };

    const url = SITE_URL + path;
    document.title = title;
    setMeta("name", "description", desc);
    setMeta("name", "robots", "index, follow");
    setCanonical(url);

    setMeta("property", "og:type", cfg.service ? "article" : "website");
    setMeta("property", "og:site_name", "EpoxyGarageFloorEstimate.com");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", image);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", desc);
    setMeta("name", "twitter:image", image);

    clearJsonLd();
    const blocks = buildJsonLd(path, merged);
    blocks.forEach((obj) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.setAttribute("data-seo", "jsonld");
      s.textContent = JSON.stringify(obj);
      document.head.appendChild(s);
    });
  }, [location.pathname, overrides]);

  return null;
}