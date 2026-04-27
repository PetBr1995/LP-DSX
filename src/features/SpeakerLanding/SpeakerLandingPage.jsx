import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import SpeakerLandingTemplate from "./components/SpeakerLandingTemplate";
import { getSegmentBySlug, segmentLandingList } from "./speakerLandingData";

const SegmentNotFound = () => {
  const suggestedSegments = segmentLandingList.slice(0, 8);

  return (
    <section className="min-h-screen bg-black px-4 py-16 text-white">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/15 bg-[#0A0A0A] p-8">
        <p className="font-jamjuree text-sm uppercase tracking-[0.1em] text-[#F5C02B]">
          LP de Segmento
        </p>
        <h1 className="mt-2 font-anton text-4xl uppercase">Segmento não encontrado</h1>
        <p className="mt-3 font-jamjuree text-white/80">
          Confira alguns slugs disponíveis para testar o template dinâmico:
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {suggestedSegments.map((segment) => (
            <Link
              key={segment.slug}
              to={`/lp/${segment.slug}`}
              className="rounded-full border border-[#F5C02B]/40 px-4 py-2 font-jamjuree text-sm text-[#F5C02B] transition hover:bg-[#F5C02B]/10"
            >
              {segment.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const SpeakerLandingPage = () => {
  const { slug = "" } = useParams();
  const segment = useMemo(() => getSegmentBySlug(slug), [slug]);

  useEffect(() => {
    const isValidSegment = Boolean(segment);
    const pageTitle = isValidSegment
      ? `${segment.name} | Segmento DSX 2026`
      : "Segmento | DSX 2026";
    const pageDescription = isValidSegment
      ? `Trilha de ${segment.name} no DSX 2026`
      : "Conheça as trilhas de segmento do DSX 2026.";
    const pageUrl = isValidSegment
      ? `https://dsx.com.vc/lp/${segment.slug}`
      : "https://dsx.com.vc/";

    document.title = pageTitle;

    const updates = [
      { type: "name", key: "description", value: pageDescription },
      {
        type: "name",
        key: "robots",
        value: isValidSegment
          ? "index,follow,max-image-preview:large"
          : "noindex,follow",
      },
      { type: "property", key: "og:type", value: "website" },
      { type: "property", key: "og:title", value: pageTitle },
      { type: "property", key: "og:description", value: pageDescription },
      { type: "property", key: "og:url", value: pageUrl },
      { type: "name", key: "twitter:title", value: pageTitle },
      { type: "name", key: "twitter:description", value: pageDescription },
      { type: "name", key: "twitter:url", value: pageUrl },
    ];

    const previousTags = updates.map((item) => {
      const selector =
        item.type === "name"
          ? `meta[name="${item.key}"]`
          : `meta[property="${item.key}"]`;
      let tag = document.head.querySelector(selector);
      const existed = Boolean(tag);
      const previousContent = tag?.getAttribute("content");

      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(item.type, item.key);
        document.head.appendChild(tag);
      }

      tag.setAttribute("content", item.value);
      return { tag, existed, previousContent };
    });

    let canonicalTag = document.head.querySelector('link[rel="canonical"]');
    const canonicalExisted = Boolean(canonicalTag);
    const previousCanonical = canonicalTag?.getAttribute("href");

    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }

    canonicalTag.setAttribute("href", pageUrl);

    return () => {
      previousTags.forEach(({ tag, existed, previousContent }) => {
        if (!existed) {
          tag.remove();
          return;
        }

        if (previousContent === null) {
          tag.removeAttribute("content");
        } else {
          tag.setAttribute("content", previousContent);
        }
      });

      if (!canonicalExisted) {
        canonicalTag?.remove();
      } else if (previousCanonical === null) {
        canonicalTag?.removeAttribute("href");
      } else {
        canonicalTag?.setAttribute("href", previousCanonical);
      }
    };
  }, [segment]);

  if (!segment) {
    return <SegmentNotFound />;
  }

  return <SpeakerLandingTemplate speaker={segment} />;
};

export default SpeakerLandingPage;
