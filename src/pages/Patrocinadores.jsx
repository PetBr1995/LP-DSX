import { useEffect } from "react";

import AmbientesPatrocinadores from "../components/ComponentsPatrocinadores/AmbientesPatrocinadores";
import BigNumberPatrocinadores from "../components/ComponentsPatrocinadores/BigNumberPatrocinadores";
import CallToActionPatrocinadores from "../components/ComponentsPatrocinadores/CallToActionPatrocinadores";
import FAQpatrocinadores from "../components/ComponentsPatrocinadores/FAQPatrocinadores";
import HeroPatrocinadores from "../components/ComponentsPatrocinadores/HeroPatrocinadores";
import LugarPatrocinadores from "../components/ComponentsPatrocinadores/LugarPatrocinadores";
import MarcasPatrocinadores from "../components/ComponentsPatrocinadores/MarcasPatrocinadores";
import NoticiasDSXPatrocinadores from "../components/ComponentsPatrocinadores/NoticiasDSXPatrocinadores";
import ReferenciasPatrocinadores from "../components/ComponentsPatrocinadores/ReferenciasPatrocinadores";
import VideoSectionPatrocinadores from "../components/ComponentsPatrocinadores/VideoSectionPatrocinadores";
import Footer from "../components/Footer";
import BotaoWP from "../components/BotaoWP";

const Patrocinadores = () => {
    useEffect(() => {
        /** TITLE */
        document.title =
            "Patrocine o DSX 2026 | Maior evento de negócios do Norte do Brasil";

        /** DESCRIPTION */
        let description = document.querySelector('meta[name="description"]');
        if (!description) {
            description = document.createElement("meta");
            description.setAttribute("name", "description");
            document.head.appendChild(description);
        }
        description.setAttribute(
            "content",
            "Associe sua marca ao maior evento de negócios, marketing, vendas e inovação do Norte do Brasil. Conheça as cotas de patrocínio do DSX 2026."
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
        setOg("og:title", "Patrocine o DSX 2026");
        setOg(
            "og:description",
            "Presença estratégica, networking e ativações que conectam sua marca aos líderes do mercado."
        );
        setOg("og:image", "https://seudominio.com/og-patrocinadores.png");
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
        setTwitter("twitter:title", "Patrocine o DSX 2026");
        setTwitter(
            "twitter:description",
            "O maior evento de negócios, marketing, vendas e inovação do Norte do Brasil."
        );
        setTwitter("twitter:image", "https://seudominio.com/og-patrocinadores.png");
    }, []);

    return (
        <>
            <div className="overflow-x-hidden">
                <HeroPatrocinadores />
                <BigNumberPatrocinadores />
                <VideoSectionPatrocinadores />
                <ReferenciasPatrocinadores />
                <AmbientesPatrocinadores />
                <LugarPatrocinadores />
                <NoticiasDSXPatrocinadores />
                <MarcasPatrocinadores />
                <CallToActionPatrocinadores />
                <FAQpatrocinadores />
                <Footer />
            </div>
        </>
    );
};

export default Patrocinadores;
