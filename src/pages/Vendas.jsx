import { useEffect, useState } from "react";

import HeroVendas from "../components/ComponentsVendas/HeroVendas";
import SecondSectionVendas from "../components/ComponentsVendas/SecondSectionVendas";
import CallToActionPatrocinadores from "../components/ComponentsPatrocinadores/CallToActionPatrocinadores";
import Footer from "../components/Footer";
import FormVendas from "../components/ComponentsVendas/FormVendas";
import ImpactoVendas from "../components/ComponentsVendas/ImpactoVendas";

import PassaporteVendas from "../components/ComponentsVendas/PassaporteVendas";
import PassaporteVendasMobile from "../components/ComponentsVendas/PassaporteVendasMobile";

const Vendas = () => {
  useEffect(() => {
    /** TITLE */
    document.title = "Ingressos DSX 2026 | Garanta seu passaporte";

    /** DESCRIPTION */
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.setAttribute("name", "description");
      document.head.appendChild(description);
    }
    description.setAttribute(
      "content",
      "Compre seu ingresso para o DSX 2026, o maior evento de negócios, marketing, vendas e inovação do Norte do Brasil. Garanta seu passaporte."
    );

    /** OPEN GRAPH */
    const setOg = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setOg("og:type", "website");
    setOg("og:title", "Ingressos DSX 2026 | Garanta seu passaporte");
    setOg(
      "og:description",
      "Garanta seu ingresso para o DSX 2026 e participe do maior evento de negócios do Norte do Brasil."
    );
    // troque para a imagem real de vendas
    setOg("og:image", "https://seudominio.com/og-vendas.png");
    setOg("og:url", window.location.href);

    /** TWITTER */
    const setTwitter = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setTwitter("twitter:card", "summary_large_image");
    setTwitter("twitter:title", "Ingressos DSX 2026 | Garanta seu passaporte");
    setTwitter(
      "twitter:description",
      "Compre seu ingresso para o DSX 2026, o maior evento de negócios do Norte do Brasil."
    );
    // troque para a imagem real de vendas
    setTwitter("twitter:image", "https://seudominio.com/og-vendas.png");
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 1015);
    };

    checkIsMobile(); // checa no primeiro render

    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <>
      <section className="overflow-x-hidden">
        <HeroVendas />
        <SecondSectionVendas />
        <ImpactoVendas />

        {isMobile ? <PassaporteVendasMobile /> : <PassaporteVendas />}

        <CallToActionPatrocinadores />
        <FormVendas />
        <Footer />
      </section>
    </>
  );
};

export default Vendas;
