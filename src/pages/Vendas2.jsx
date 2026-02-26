import { useEffect, useState } from "react";
import PassaporteVendas from "../components/ComponentsVendas/PassaporteVendas"
import PassaporteVendasMobile from "../components/ComponentsVendas/PassaporteVendasMobile"
import { CheckSquare } from "lucide-react"
const Vendas2 = () => {

  const infoCardReceber = [
    {
      number: 1,
      titulo: "Acesso aos 2 dias de evento",
      desc: "Conteudo estrategico em 23 e 24 de julho de 2026."
    },
    {
      number: 2,
      titulo: "Acesso aos 2 dias de evento",
      desc: "Conteudo estrategico em 23 e 24 de julho de 2026."
    },
    {
      number: 3,
      titulo: "Acesso aos 2 dias de evento",
      desc: "Conteudo estrategico em 23 e 24 de julho de 2026."
    },
    {
      number: 4,
      titulo: "Acesso aos 2 dias de evento",
      desc: "Conteudo estrategico em 23 e 24 de julho de 2026."
    },
  ]

  const infParaQuemE = [
    {
      conteudo: "Empresario que quer destravar crescimento com previsibilidade"
    },
    {
      conteudo: "Gestor que precisa tomar decisao com mais clareza e menos achismo"
    },
    {
      conteudo: "Profissional de marketing e vendas focado em performance"
    },
    {
      conteudo: "Time comercial que precisa vender com processo"
    },
  ]

  const infProvaSocial = [
    {
      nome: "Aline Costa",
      profissao: "Empresaria",
      desc: "Sai com um plano claro para os proximos 90 dias. So isso ja pagou o ingresso.",
      img: ""
    },
    {
      nome: "Aline Costa",
      profissao: "Empresaria",
      desc: "Sai com um plano claro para os proximos 90 dias. So isso ja pagou o ingresso.",
      img: ""
    },
    {
      nome: "Aline Costa",
      profissao: "Empresaria",
      desc: "Sai com um plano claro para os proximos 90 dias. So isso ja pagou o ingresso.",
      img: ""
    },
    {
      nome: "Aline Costa",
      profissao: "Empresaria",
      desc: "Sai com um plano claro para os proximos 90 dias. So isso ja pagou o ingresso.",
      img: ""
    },
  ]

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 1015);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <>
      <section>
        <div className="relative z-10 ">
          <img src="/logo-dsx-horizontal.svg" className="mx-auto mt-5" alt="logo-dsx" />
          <div className="mx-auto my-5 flex w-fit self-center flex-col items-center justify-center gap-1 rounded-2xl border border-white/20 bg-white/10 px-3 py-2 text-center sm:flex-row sm:gap-3 sm:px-4 sm:py-2">
            <p className="text-sm text-white sm:text-base">23 e 24 de Julho de 2026</p>
            <span className="hidden text-white/60 sm:inline">•</span>
            <p className="text-sm text-white sm:text-base">Vasco Vasques - Manaus</p>
          </div>
          <h1 className="text-center text-white uppercase font-bebas text-7xl font-black">
            O <span className="text-[#F5A205]">Norte</span> nao assiste mais de longe.
          </h1>
          <p className="text-center text-white">O evento que todo mundo comentou em 2025 esta de volta.</p>
          <div className="relative z-20 mx-auto mt-8 w-full max-w-5xl px-4">
            <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-black/60 pt-[56.25%]">
              <iframe
                src="https://player.vimeo.com/video/1148163345?title=0&byline=0&portrait=0&controls=0&autoplay=1&loop=1"
                title="DSX 2026"
                className="absolute inset-0 h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
          <div
            className="relative z-0 -mt-24 min-h-[50vh] bg-white pt-24 sm:pt-28 md:pt-32 pb-10"
            style={{ clipPath: "polygon(0 20%, 100% 0, 100% 100%, 0% 100%)" }}
          >
            <img
              src="/badge-promocional.png"
              className="
      absolute
      w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44
      top-30 sm:top-30 md:top-20
      left-4 sm:left-10 md:left-40 lg:w-35 lg:h-35 lg:left-120
      animate-badge
      pointer-events-none
      select-none
    "
              alt="badge"
            />

            <p
              className="
      text-red-500 relative font-black text-center
      text-xl sm:text-2xl md:text-3xl
      mt-10 sm:mt-12 md:mt-14
      inline-block left-1/2 -translate-x-1/2
      after:content-['']
      after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2
      after:w-full after:max-w-[220px] sm:after:max-w-[260px] md:after:max-w-[320px]
      after:h-[3px] after:bg-red-500 after:rounded-full
    "
            >
              De R$ 697,00
            </p>

            <p className="text-center uppercase font-light text-2xl sm:text-3xl md:text-4xl mt-2">
              Por apenas
            </p>

            <h3 className="text-green-700 font-black font-bebas text-center leading-none mt-2 text-[9rem] sm:text-[10rem] md:text-[11rem]">
              R$ 297,00
            </h3>

            <div className="flex justify-center items-center mt-6 px-4">
              <a
                href="#"
                className="
        text-center
        text-base sm:text-lg md:text-xl
        font-jamjuree uppercase font-extrabold
        px-5 sm:px-6 md:px-8
        py-3
        rounded-md
        bg-linear-to-r from-[#F3CB46] to-[#E7A040]
        w-full sm:w-auto
      "
              >
                Garanta seu passaporte agora
              </a>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
          <h2 className="text-center font-bebas text-4xl font-black text-white sm:text-6xl md:text-7xl">
            O que você vai receber
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-3 sm:mt-8 sm:gap-4">
            {infoCardReceber.map((info) => (
              <div
                key={info.number}
                className="flex items-start gap-3 rounded-lg border border-white/20 bg-white/10 p-4 sm:p-5"
              >
                <p className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-r from-[#F3CB46] to-[#E7A040] text-base font-black text-black sm:h-10 sm:w-10">
                  {info.number}
                </p>
                <div>
                  <h3 className="font-jamjuree text-lg font-extrabold uppercase tracking-wide text-white sm:text-2xl">
                    {info.titulo}
                  </h3>
                  <p className="mt-1 text-sm text-white/90 sm:text-base">{info.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 py-6">
          <div className="max-w-7xl mx-auto px-2 py-6 bg-linear-to-r from-[#F3CB46] to-[#E7A040] rounded-2xl">
            <h2 className="text-center uppercase font-black text-7xl font-bebas mb-4">Para quem é: </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 px-4">
              {infParaQuemE.map((info) => (
                <div className="flex bg-white p-2 gap-2 rounded-md">
                  <div>
                    <CheckSquare />
                  </div>
                  <h2 className="font-bold">{info.conteudo}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="passaportes" className="bg-[url(/ELEMENTOS-BANNER-2.png)] bg-cover bg-no-repeat bg-center">
          {isMobile ? <PassaporteVendasMobile /> : <PassaporteVendas />}
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <p className="text-center text-xs font-black uppercase tracking-[0.14em] text-[#D6AEFF] sm:text-sm">
            Prova social
          </p>
          <h2 className="mt-2 text-center font-bebas text-4xl font-black uppercase text-white sm:text-6xl lg:text-7xl">
            Depoimentos de quem viveu o DSX 2025
          </h2>
          <p className="mx-auto mt-2 max-w-3xl text-center text-sm text-white/75 sm:text-base">
            Nao e promessa vazia. E experiencia real de quem participou e aplicou.
          </p>
          <div className="mt-6 grid grid-cols-1 items-stretch gap-3 sm:mt-8 md:grid-cols-2 md:gap-4">
            {infProvaSocial.map((info, index) => (
              <div
                key={`${info.nome}-${index}`}
                className="grid h-full grid-cols-[86px_1fr] items-end gap-3 rounded-2xl border border-white/20 bg-linear-to-r from-black to-[#8e3eeb]/20 p-3 sm:grid-cols-[120px_1fr] sm:gap-4 sm:p-4"
              >
                <div className="aspect-[3/4] w-full overflow-hidden rounded-lg border border-white/35">
                  <img
                    src="/Card-kepler.png"
                    alt={info.nome}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex h-full flex-col justify-center px-1 py-1 sm:px-0 sm:py-0">
                  <h3 className="text-lg font-black text-white">{info.nome}</h3>
                  <h5 className="mb-2 text-sm text-white/80">{info.profissao}</h5>
                  <div className="rounded-xl border border-[#F3CB46]/35 p-3">
                    <p className="text-sm text-white/95">{info.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <footer className="px-4 pb-10 pt-4">
          <div className="mx-auto max-w-7xl rounded-2xl border border-[#F3CB46]/35 bg-white/[0.04] px-4 py-8 text-center text-white sm:px-6">
            <img
              src="/logo-dsx-horizontal.svg"
              className="mx-auto h-auto w-44 sm:w-52"
              alt="logo-dsx"
            />
            <div className="mx-auto mt-5 h-px w-full max-w-md bg-[#F3CB46]/25" />
            <p className="mt-5 text-sm text-white/90 sm:text-base">CNPJ 10.279.661/0001-51</p>
            <p className="text-sm text-white/90 sm:text-base">Digital Comunicacao</p>
            <p className="mt-2 text-sm text-white/80 sm:text-base">Todos os direitos reservados.</p>
            <p className="mt-3 text-sm font-bold uppercase tracking-wide text-[#F3CB46] sm:text-base">
              por Digital Hub Experience
            </p>
          </div>
        </footer>
      </section>
    </>
  )
};

export default Vendas2;
