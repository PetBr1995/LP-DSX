import FaixaLote from "../components/ComponentsVendas/FaixaLote"
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

  return (
    <>
      <section>
        <div className="relative z-10 ">
          <img src="/logo-dsx-horizontal.svg" className="mx-auto mt-5" alt="logo-dsx" />
          <div className="bg-white/10 mx-auto flex my-5 justify-center items-center gap-2 border-1 border-white/20 w-fit px-2 py-1 rounded-2xl">
            <p className="text-white">23 e 24 de Julho de 2026</p>
            <p className="text-white">Vasco vasques - Manaus</p>
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
            className="py-4 relative z-0 -mt-24 min-h-[50vh] bg-white pt-32"
            style={{ clipPath: "polygon(0 20%, 100% 0, 100% 100%, 0% 100%)" }}
          >
            <FaixaLote />
            <p className="text-red-500 font-black text-3xl mt-10 text-center">De R$ 697,00</p>
            <p className="text-4xl font-light uppercase text-center">Por apenas</p>
            <h3 className="text-green-700 font-black text-8xl font-bebas text-center">R$ 297,00</h3>
            <div className="flex justify-center items-center">
              <a href="#" className="text-xl font-jamjuree uppercase font-extrabold px-6 py-2 rounded-md bg-linear-to-r from-[#F3CB46] to-[#E7A040]">Garanta seu passaporte agora</a>
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
