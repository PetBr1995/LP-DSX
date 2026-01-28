import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import CTAButton from "../Mascaras/CTAButton";

const SecondSectionVendas = () => {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const inf = [
    {
      icon: "/vector-16.svg",
      text: "Clareza do que priorizar",
    },
    {
      icon: "/vector-9.svg",
      text: "Networking com líderes e empresários",
    },
    {
      icon: "/vector-14.svg",
      text: "Métodos aplicáveis no seu negócio",
    },
    {
      icon: "/vector-15.svg",
      text: "Insights para vender melhor e operar com mais eficiência",
    },
  ];

  // 🎥 Inicializa Vimeo Player
  useEffect(() => {
    if (!iframeRef.current) return;

    const player = new Player(iframeRef.current);
    playerRef.current = player;

    const onLoaded = () => setIsReady(true);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    player.on("loaded", onLoaded);
    player.on("play", onPlay);
    player.on("pause", onPause);

    return () => {
      player.off("loaded", onLoaded);
      player.off("play", onPlay);
      player.off("pause", onPause);
      player.unload?.().catch(() => { });
    };
  }, []);

  const handleStart = async () => {
    try {
      const player = playerRef.current;
      if (!player) return;

      await player.setMuted(false).catch(() => { });
      await player.setVolume(1).catch(() => { });
      await player.play();
    } catch {
      try {
        const player = playerRef.current;
        if (!player) return;
        await player.setMuted(true);
        await player.play();
      } catch { }
    }
  };

  return (
    <section
      className="
        relative py-10 overflow-hidden

        after:absolute
        after:content-['']
        after:inset-0
        after:bg-[url('/fundo-faq-patrocinadores.png')]
        after:bg-cover
        after:bg-center
        after:bg-no-repeat
        after:z-[1]
      "
    >
      {/* Overlay leitura */}
      <div className="absolute inset-0 bg-black/50 z-[2]" />

      {/* Conteúdo */}
      <div className="relative z-[3] max-w-7xl mx-auto px-4">
        {/* Título */}
        <h2
          className="
          font-anton uppercase text-white
          text-3xl sm:text-4xl md:text-5xl lg:text-6xl
          text-center mb-6
          sm:leading-17
          md:leading-17
        "
        >
          Dois dias para alinhar visão,
          <br />
          performance e tecnologia
        </h2>

        <p
          className="
          uppercase font-extralight text-white
          text-sm sm:text-base md:text-xl
          text-center mb-10
        "
        >
          para você avançar para o próximo passo com:
        </p>

        {/* 🎥 VIDEO PLAYER */}
        <div className="mb-12">
          <div className="relative w-full mx-auto aspect-video overflow-hidden rounded-2xl bg-black shadow-xl">
            {/* IFRAME */}
            <iframe
              ref={iframeRef}
              title="Video Evento Vendas"
              src="https://player.vimeo.com/video/1146735494?autoplay=0&muted=0&loop=1&controls=0&title=0&byline=0&portrait=0&autopause=0&playsinline=1"
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
            />

            {/* Overlay Play */}
            {!isPlaying && (
              <div className="absolute inset-0 grid place-items-center bg-black/45 backdrop-blur-[2px]">
                <button
                  type="button"
                  onClick={handleStart}
                  disabled={!isReady}
                  className="
                    cursor-pointer
                    h-14 w-14
                    rounded-full
                    bg-white/10
                    backdrop-blur
                    border border-white/20
                    grid place-items-center
                    shadow-lg

                    hover:scale-105 hover:bg-white/20
                    transition-all duration-300

                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                >
                  <img src="/play.svg" alt="play" className="w-6" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Glass Card */}
        <div
          className="
            border border-white
            p-4 sm:p-6
            rounded-xl

            grid grid-cols-1 sm:grid-cols-2
            gap-4 sm:gap-6

            backdrop-blur-[5.05px]
            bg-white/10
            shadow-lg
          "
        >
          {inf.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <img
                src={item.icon}
                alt="item"
                className="w-10 sm:w-12 md:w-14"
              />

              <h3 className="text-white uppercase text-sm sm:text-base">
                {item.text}
              </h3>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <CTAButton titulo="Quero meu passaporte" link="/" />
        </div>
      </div>
    </section>
  );
}

export default SecondSectionVendas;
