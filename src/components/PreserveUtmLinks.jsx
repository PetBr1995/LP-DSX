import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PREFIX_DOMAINS = [
  "https://pay.hub.la",
  "https://invoice.hub.la",
  "https://app.hub.la",
  "https://hub.la",
];

const STORAGE_KEY = "hubla_utms";

function getUtmParamsExtraFromSearchParams(sp) {
  const utm_source = sp.get("utm_source") ?? "";
  const utm_medium = sp.get("utm_medium") ?? "";
  const utm_campaign = sp.get("utm_campaign") ?? "";
  const utm_term = sp.get("utm_term") ?? "";
  const utm_content = sp.get("utm_content") ?? "";

  const hasAny =
    utm_source || utm_medium || utm_campaign || utm_term || utm_content;

  return hasAny
    ? `&sck=${encodeURIComponent(
        `${utm_source}|${utm_medium}|${utm_campaign}|${utm_term}|${utm_content}`
      )}`
    : "";
}

function shouldRewriteLink(href) {
  return PREFIX_DOMAINS.some((d) => href.startsWith(d));
}

function getPersistedParams(locationSearch) {
  // 1) se a URL atual tem query, salva e usa ela
  const current = new URLSearchParams(locationSearch);
  if (current.toString()) {
    sessionStorage.setItem(STORAGE_KEY, current.toString());
    return current;
  }

  // 2) senão, tenta usar o que foi salvo na primeira entrada (landing)
  const saved = sessionStorage.getItem(STORAGE_KEY) || "";
  return new URLSearchParams(saved);
}

function rewriteLinks(params) {
  if (!params || !params.toString()) return;

  const qs = params.toString();
  const sck = getUtmParamsExtraFromSearchParams(params);

  document.querySelectorAll("a[href]").forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;

    if (
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    )
      return;

    if (!shouldRewriteLink(href)) return;

    // Evita duplicar grosseiramente
    if (href.includes("utm_source=") || href.includes("utm_medium=") || href.includes("utm_campaign=")) {
      return;
    }

    const separator = href.includes("?") ? "&" : "?";
    a.setAttribute("href", `${href}${separator}${qs}${sck}`);
  });
}

export default function PreserveUtmLinks() {
  const location = useLocation();

  useEffect(() => {
    const params = getPersistedParams(location.search);

    rewriteLinks(params);

    const observer = new MutationObserver(() => rewriteLinks(params));
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [location.search]);

  return null;
}
