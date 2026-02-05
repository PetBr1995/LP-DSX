import { useMemo, useState, useEffect } from "react";

const ImpactoVendas = () => {
  const videos = [
    {
      titulo: "Expositor",
      video: "https://vimeo.com/1148163345?fl=ip&fe=ec",
      thumb: "/card-image/expositor-card-img.png", // <- coloque no /public/thumbs/
    },
    {
      titulo: "Palestrante",
      video: "https://vimeo.com/1148163374?fl=ip&fe=ec",
      thumb: "/card-image/kepler-card-img.png",
    },
    {
      titulo: "Participante",
      video: "https://vimeo.com/1148163408?fl=ip&fe=ec",
      thumb: "/card-image/participante-card-img.png",
    },
  ];

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  // 🔒 Bloqueia scroll quando modal abre
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // 🔗 Converte link do Vimeo em embed
  const toVimeoEmbed = (url) => {
    try {
      const u = new URL(url);
      const id = u.pathname.split("/").filter(Boolean)[0];

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

  return (
    <section
      className="py-12 bg-black relative overflow-hidden
      before:absolute before:inset-0 before:bg-bottom-right before:bg-cover before:bg-[url(/fundo-impacto-section.png)]
      after:absolute after:left-0 after:bottom-0 after:w-50 after:h-50 after:bg-no-repeat after:bg-center after:bg-cover after:bg-[url(/vector-30.svg)]
    "
    >
      <h2 className="relative z-10 font-anton uppercase text-4xl sm:text-6xl text-white text-center">
        O jogo muda quando você entra no ambiente certo
      </h2>

      <p className="relative z-10 text-white text-center uppercase mt-3 opacity-80">
        Confira como a 1ª edição impactou no mercado da Região Norte.
      </p>

      {/* GRID */}
      <div className="relative z-10 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {videos.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setActive(item);
              setOpen(true);
            }}
            className="group relative rounded-2xl overflow-hidden focus:outline-none"
          >
            {/* CARD (quadrado no mobile) */}
            <div className="relative bg-black aspect-square sm:aspect-[9/16]">
              {item.thumb && (
                <img
                  src={item.thumb}
                  alt={item.titulo}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  loading="lazy"
                  draggable="false"
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition" />

              {/* Play */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="white">
                    <path d="M9 18V6L19 12L9 18Z" />
                  </svg>
                </div>
              </div>

              {/* Texto */}
              <div className="absolute bottom-4 left-4">
                <p className="text-white uppercase font-bold tracking-wider">
                  {item.titulo}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpen(false)}
          />

          <div className="relative z-10 w-full max-w-4xl mx-4 bg-black rounded-xl overflow-hidden">
            <div className="flex justify-between items-center p-3 border-b border-white/10">
              <span className="text-white uppercase font-anton">
                {active?.titulo}
              </span>

              <button
                onClick={() => setOpen(false)}
                className="text-white text-xl hover:opacity-70 transition"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video bg-black">
              {embedUrl && (
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  frameBorder="0"
                  title="Vídeo"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ImpactoVendas;
