import { useEffect, useState } from "react";
import {
  NewVendasContent,
  NewVendasHero,
} from "../components/NewVendas";
import HeaderMask from "../components/Mascaras/HeaderMask";

const NewVendas = () => {
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    const pageTitle = "Ingressos DSX 2026 | 3º Lote Aberto";
    const pageDescription =
      "Garanta seu passaporte para o DSX 2026: o maior evento de negócios, marketing, vendas e inovação do Norte. Dias 23 e 24 de julho em Manaus.";
    const pageUrl = "https://dsx.com.vc/newvendas";
    const ogImage = "https://dsx.com.vc/Banner-vendas-hero.png";

    document.title = pageTitle;

    const updates = [
      { type: "name", key: "description", value: pageDescription },
      { type: "name", key: "robots", value: "index,follow,max-image-preview:large" },
      { type: "property", key: "og:type", value: "website" },
      { type: "property", key: "og:title", value: pageTitle },
      { type: "property", key: "og:description", value: pageDescription },
      { type: "property", key: "og:url", value: pageUrl },
      { type: "property", key: "og:image", value: ogImage },
      { type: "name", key: "twitter:card", value: "summary_large_image" },
      { type: "name", key: "twitter:title", value: pageTitle },
      { type: "name", key: "twitter:description", value: pageDescription },
      { type: "name", key: "twitter:image", value: ogImage },
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

    const schemaId = "jsonld-new-vendas";
    const schema = {
      "@context": "https://schema.org",
      "@type": "Event",
      name: "DSX 2026 | Digital Summit Experience",
      description: pageDescription,
      startDate: "2026-07-23T09:00:00-04:00",
      endDate: "2026-07-24T22:00:00-04:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      image: [ogImage],
      url: pageUrl,
      location: {
        "@type": "Place",
        name: "Centro de Convenções Vasco Vasques",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Manaus",
          addressRegion: "AM",
          addressCountry: "BR",
        },
      },
      offers: {
        "@type": "Offer",
        price: "497.00",
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
        url: pageUrl,
      },
      organizer: {
        "@type": "Organization",
        name: "DSX | Digital Summit Experience",
        url: "https://dsx.com.vc/",
      },
    };

    let jsonLdTag = document.getElementById(schemaId);
    const jsonLdExisted = Boolean(jsonLdTag);
    const previousJsonLd = jsonLdTag?.textContent ?? "";

    if (!jsonLdTag) {
      jsonLdTag = document.createElement("script");
      jsonLdTag.setAttribute("id", schemaId);
      jsonLdTag.setAttribute("type", "application/ld+json");
      document.head.appendChild(jsonLdTag);
    }

    jsonLdTag.textContent = JSON.stringify(schema);

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

      if (!jsonLdExisted) {
        jsonLdTag?.remove();
      } else {
        jsonLdTag.textContent = previousJsonLd;
      }
    };
  }, []);

  useEffect(() => {
    const ctaElement = document.getElementById("newvendas-primary-cta");

    if (!ctaElement || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ctaPassedAboveViewport = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        setShowStickyCta(ctaPassedAboveViewport);
      },
      { threshold: 0 }
    );

    observer.observe(ctaElement);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative isolate overflow-hidden bg-[#0F0E0A] pb-28 md:pb-32"
      aria-label="Página de vendas DSX 2026"
    >
      <div className="relative z-10">
        <NewVendasHero />
        <NewVendasContent />
      </div>

      <div
        className={`fixed bottom-0 left-0 right-0 z-[130] border-t border-[#2F2717] bg-[#0F0E0A]/95 px-4 py-3 backdrop-blur-sm transition-all duration-500 ease-out ${
          showStickyCta
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-[770px] flex-col items-center">
          <HeaderMask
            titulo="Garantir meu passaporte"
            link="#passaportes"
            textColor="#FFFFFF"
            backgroundColor="#1E1A12"
            font="700"
            size="lg"
          />
          <span className="mt-1 block text-[12px] font-semibold normal-case text-[#C9A84C] md:text-[16px]">
            3º Lote — a partir de R$497
          </span>
        </div>
      </div>
    </section>
  );
};

export default NewVendas;
