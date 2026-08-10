import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SEO_ROUTES, DEFAULT_SEO, buildJsonLd, SITE_URL } from "@/lib/seoConfig";

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

// Route-aware SEO: reads the current path, applies matching meta tags + JSON-LD.
// Placed once inside <Router> in App.jsx — no per-page edits needed.
export default function RouteSeo() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let cfg = SEO_ROUTES[path];
    if (!cfg) {
      const dynKey = Object.keys(SEO_ROUTES).find(
        (k) => k.includes(":") && path.startsWith(k.split(":")[0])
      );
      cfg = dynKey ? SEO_ROUTES[dynKey] : DEFAULT_SEO;
    }

    const url = SITE_URL + path;
    const title = cfg.title || DEFAULT_SEO.title;
    const desc = cfg.description || DEFAULT_SEO.description;
    const image = cfg.image || DEFAULT_SEO.image;

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
    const blocks = buildJsonLd(path, cfg);
    blocks.forEach((obj) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.setAttribute("data-seo", "jsonld");
      s.textContent = JSON.stringify(obj);
      document.head.appendChild(s);
    });
  }, [location.pathname]);

  return null;
}