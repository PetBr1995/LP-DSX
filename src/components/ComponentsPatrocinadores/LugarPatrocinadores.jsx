import { useEffect, useMemo, useState } from "react";

const LugarPatrocinadores = () => {
  const cardInfo = [
    {
      titulo: "Palestrantes",
      video: "https://vimeo.com/1148163374?fl=ip&fe=ec",
      desc: "Vozes que subiram ao palco para compartilhar visão e cases de sucesso.",
      thumb: "card-image/kepler-card-img.png",
    },
    {
      titulo: "Expositor",
      video: "https://vimeo.com/1148163345?fl=ip&fe=ec",
      desc: "Marcas que estiveram na linha de frente, gerando conexões, oportunidades e negócios",
      thumb: "card-image/expositor-card-img.png",
    },
    {
      titulo: "Participantes",
      video: "https://vimeo.com/1148163408?fl=ip&fe=ec",
      desc: "Empresários e profissionais que viveram o DSX 2025 e saíram com uma nova direção.",
      thumb: "/card-image/participante-card-img.png",
    },
  ];

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  // Converte vimeo.com/ID -> player.vimeo.com/video/ID (mantendo querystring)
  const toVimeoEmbed = (url) => {
    try {
      const u = new URL(url);
      const id = u.pathname.split("/").filter(Boolean)[0];
      if (!id) return url;

      const params = new URLSearchParams(u.search);
      params.set("autoplay", "1");
      params.set("title", "0");
      params.set("byline", "0");
      params.set("portrait", "0");

      return `https://player.vimeo.com/video/${id}?${params.toString()}`;
    } catch {
      return url;
    }
  };

  const embedUrl = useMemo(() => {
    if (!active?.video) return "";
    return toVimeoEmbed(active.video);
  }, [active]);

  const closeModal = () => {
    setOpen(false);
    setTimeout(() => setActive(null), 150);
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };

    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <section
      className="
        relative bg-black text-white overflow-hidden
        after:content-['']
        after:absolute
        after:bottom-0
        after:left-0
        after:block
        after:w-60
        after:h-60
        after:bg-[url('/vector-24.svg')]
        after:bg-no-repeat
        after:bg-cover
        after:bg-center
        after:opacity-80
        after:pointer-events-none
        after:z-0
      "
    >
      {/* TÍTULO */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-12 pb-10 text-center">
        <h2 className="font-anton uppercase text-3xl sm:text-4xl">
          O LUGAR CERTO PARA SER VISTO POR QUEM DEFINE O JOGO
        </h2>
      </div>

      {/* VÍDEOS */}
      <div className="relative z-10 text-center pb-10 px-5">
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {cardInfo.map((item) => (
            <button
              key={item.titulo}
              type="button"
              onClick={() => {
                setActive(item);
                setOpen(true);
              }}
              className="
                group text-left rounded-2xl
                hover:cursor-pointer
                transition
                focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
              "
            >
              {/* Thumb */}
              <div className="mt-4 w-full aspect-[16/9] overflow-hidden rounded-2xl relative">
                <img
                  src={item.thumb}
                  alt={`Thumbnail ${item.titulo}`}
                  className="
                    absolute inset-0 h-full w-full object-cover
                    transition-transform duration-300
                    group-hover:scale-[1.05]
                  "
                  draggable={false}
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-black/35 transition-opacity group-hover:bg-black/25" />

                {/* Play */}
                <div className="absolute inset-0 grid place-items-center">
                  <div
                    className="
                      h-16 w-16
                      rounded-full
                      grid place-items-center
                      transition-transform duration-300
                      group-hover:scale-110
                    "
                  >
                    <svg
                      width="70"
                      height="70"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="opacity-60"
                    >
                      <path d="M9 18V6L19 12L9 18Z" fill="white" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* (Opcional) Texto do card - você tinha desc no array, se quiser exibir */}
              {/* <div className="mt-4">
                <h3 className="font-anton uppercase text-xl">{item.titulo}</h3>
                <p className="mt-2 text-white/70 text-sm">{item.desc}</p>
              </div> */}
            </button>
          ))}
        </div>

        {/* MODAL */}
        {open && (
          <div className="fixed inset-0 z-50" aria-modal="true" role="dialog">
            <div className="absolute inset-0 bg-black/70" onClick={closeModal} />

            <div className="relative mx-auto flex min-h-screen max-w-5xl items-center justify-center p-4">
              <div className="relative w-full rounded-xl bg-[#0b0f14] border border-white/10 shadow-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                  <h3 className="text-white font-anton uppercase text-lg">
                    {active?.titulo}
                  </h3>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="
                      text-white/80 hover:text-white transition p-2
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-md
                    "
                    aria-label="Fechar"
                  >
                    ✕
                  </button>
                </div>

                <div className="w-full aspect-video bg-black">
                  {embedUrl && (
                    <iframe
                      key={embedUrl}
                      src={embedUrl}
                      className="h-full w-full"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      title={active?.titulo || "Vídeo"}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <button
          type="button"
          className="
            h-11 px-6 rounded-xl
            bg-gradient-to-r from-[#913DE3] via-[#A83EAA] to-[#C34484]
            text-white font-semibold
            shadow-lg
            hover:scale-[1.02] hover:shadow-xl
            transition-all duration-300
            uppercase
            mt-8
          "
        >
          Quero patrocinar
        </button>
      </div>
    </section>
  );
};

export default LugarPatrocinadores;
