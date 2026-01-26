import { useMemo, useState } from "react";

const ImpactoVendas = () => {
  const videos = [
    {
      titulo: "Participante",
      video: "https://vimeo.com/1148163374?fl=ip&fe=ec",
    },
    {
      titulo: "Participante",
      video: "https://vimeo.com/1148163345?fl=ip&fe=ec",
    },
    {
      titulo: "Participante",
      video: "https://vimeo.com/1148163408?fl=ip&fe=ec",
    },
  ];

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  // converter link vimeo normal em embed
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
    <section className="py-12 bg-black relative before:absolute before:content-[''] before:bg-bottom-right before:bg-cover before:bg-[url(/fundo-impacto-section.png)] before:w-full before:h-full z-0 after:absolute after:content-[''] after:left-0 after:bottom-0 after:w-50 after:h-50 after:bg-cover after:bg-no-repeat after:bg-center after:bg-[url(/vector-30.svg)] z-0">
      <h2 className="relative z-10 font-anton uppercase text-4xl sm:text-6xl text-white text-center">
        O jogo muda quando você entra no ambiente certo
      </h2>

      <p className="text-white text-center uppercase text-xl mt-3 opacity-80">
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
            {/* CARD VERTICAL */}
            <div className="aspect-[9/16] bg-gradient-to-b from-[#b08a00] to-[#3a2c00] relative">
              {/* overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition" />

              {/* PLAY */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="white">
                    <path d="M9 18V6L19 12L9 18Z" />
                  </svg>
                </div>
              </div>

              {/* TEXTO */}
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
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpen(false)}
          />

          <div className="relative flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-black rounded-xl overflow-hidden">
              <div className="flex justify-between items-center p-3 border-b border-white/10">
                <span className="text-white uppercase font-anton">
                  {active?.titulo}
                </span>

                <button
                  onClick={() => setOpen(false)}
                  className="text-white text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="aspect-video">
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
        </div>
      )}
    </section>
  );
};

export default ImpactoVendas;
