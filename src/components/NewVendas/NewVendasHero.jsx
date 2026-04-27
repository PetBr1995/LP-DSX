import NewVendasHeaderMask from "./NewVendasHeaderMask";
import NewVendasBigNumbersSection from "./NewVendasBigNumbersSection";
import { Calendar, MapPin } from "lucide-react";

const NewVendasHero = ({
  ctaLink = "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721",
  onPrimaryCtaClick,
}) => {
  const ctaTarget = ctaLink.startsWith("#") ? "_self" : "_blank";

  return (
    <section className="bg-black text-white">
      <div className="relative overflow-hidden">
        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-10 pt-10 md:pb-12 md:pt-0">
          <div className="text-center space-y-5 md:space-y-6">
            <div className="flex justify-center">
              <img
                src="/logo-dsx-horizontal-2.svg"
                alt="DSX"
                className="block h-16 w-auto object-contain md:h-20"
                loading="eager"
                decoding="async"
              />
            </div>
            <h1 className="mx-auto max-w-6xl font-anton text-[clamp(1.9rem,5vw,4.8rem)] uppercase leading-[1.3] tracking-[0.012em] md:leading-[1.12]">
              <span className="block text-[#F5C02B]">O MAIOR EVENTO</span>
              <span className="block text-white">
                DE NEGÓCIOS, MARKETING, VENDAS E INOVAÇÃO{" "}
                <span className="text-[#F5C02B]">DO NORTE</span>
              </span>
            </h1>
            <div className="mx-auto max-w-4xl">
              <p className="text-center text-[clamp(1rem,4.8vw,1.8rem)] leading-[1.1] text-white/90">
                Dois dias de conteúdo estratégico e conexões de alto nível.
              </p>
            </div>
            <div>
              <h3 className="font-anton text-[clamp(1.3rem,2.8vw,2rem)] uppercase tracking-[0.03em]">
                Onde os maiores especialistas <br /> do país se encontram.
              </h3>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <div className="flex items-center justify-center gap-2">
                <span><Calendar color="#F5C02B" /></span>
                <p className="text-center text-[clamp(.95rem,2.8vw,1rem)] leading-[1.2] text-white/90">
                  23 e 24 de Julho
                </p>
              </div>
              <div className="flex items-center justify-center gap-3">
                <span>
                  <MapPin color="#F5C02B" />
                </span>
                <div>
                  <p>
                    Centro de Convenções
                  </p>
                  <p>
                    Vasco Vasques, Manaus/AM
                  </p>
                </div>
              </div>
            </div>

            <div id="newvendas-primary-cta" className="flex justify-center">
              <NewVendasHeaderMask
                titulo="COMPRAR PASSAPORTE"
                link={ctaLink}
                target={ctaTarget}
                onClick={onPrimaryCtaClick}
                textColor="#FFFFFF"
                backgroundColor="#1E1A12"
                font="700"
                size="lg"
              />
            </div>
          </div>
        </div>
      </div>
      <NewVendasBigNumbersSection />
    </section>
  );
};

export default NewVendasHero;
