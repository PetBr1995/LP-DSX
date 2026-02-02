import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PREFIX_DOMAINS = [
  "https://pay.hub.la",
  "https://invoice.hub.la",
  "https://app.hub.la",
  "https://hub.la",
];

function getUtmParamsExtra(urlString) {
  const url = new URL(urlString);

  const utm_source = url.searchParams.get("utm_source") ?? "";
  const utm_medium = url.searchParams.get("utm_medium") ?? "";
  const utm_campaign = url.searchParams.get("utm_campaign") ?? "";
  const utm_term = url.searchParams.get("utm_term") ?? "";
  const utm_content = url.searchParams.get("utm_content") ?? "";

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

function rewriteLinks(searchParams) {
  if (!searchParams || !searchParams.toString()) return;

  const currentUrl = window.location.href;
  const qs = searchParams.toString();
  const sck = getUtmParamsExtra(currentUrl);

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

    // Evita duplicar (check simples)
    if (href.includes(qs)) return;

    const separator = href.includes("?") ? "&" : "?";
    a.setAttribute("href", `${href}${separator}${qs}${sck}`);
  });
}

export default function PreserveUtmLinks() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    rewriteLinks(params);

    const observer = new MutationObserver(() => rewriteLinks(params));
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [location.search]);

  return null;
}
