import { useEffect } from "react";
import { NewVendasContent, NewVendasHero } from "../components/NewVendas";

const NewVendas = () => {
  useEffect(() => {
    const pageTitle = "Ingressos DSX 2026 | 3º Lote Aberto";
    const pageDescription =
      "Garanta seu passaporte para o DSX 2026: o maior evento de negocios, marketing, vendas e inovacao do Norte. Dias 23 e 24 de julho em Manaus.";
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
        name: "Centro de Convencoes Vasco Vasques",
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

  return (
    <section className="bg-[#050505] pb-28 md:pb-32" aria-label="Pagina de vendas DSX 2026">
      <NewVendasHero />
      <NewVendasContent />

      <div className="fixed bottom-0 left-0 right-0 z-[130] border-t border-[#2F260A] bg-[#080808]/95 px-4 py-3 backdrop-blur-sm">
        <a
          href="/checkout"
          aria-label="Garantir passaporte terceiro lote"
          className="mx-auto block w-full max-w-[770px] rounded-xl bg-[#F5C02B] px-5 py-3 text-center text-[16px] font-extrabold uppercase leading-tight text-black transition hover:brightness-105 md:py-4 md:text-[28px]"
        >
          Garantir passaporte →
          <span className="mt-1 block text-[11px] font-medium normal-case text-[#372A03] md:text-[15px]">
            3º Lote — a partir de R$497
          </span>
        </a>
      </div>
    </section>
  );
};

export default NewVendas;
