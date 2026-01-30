import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import CTAButton from "../../components/Mascaras/CTAButton";

const HeroVendas = () => {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const info = [
    { number: "+2.000", title: "Participantes" },
    { number: "+30", title: "Expositores" },
    { number: "+50", title: "Palestrantes" },
  ];

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

  const handlePlay = async () => {
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
      relative pt-10 sm:pt-20 md:pt-30
      bg-[url('/Banner-vendas-hero.png')]
      bg-center bg-cover bg-no-repeat
  
      after:content-['']
      after:absolute
      after:inset-auto
      after:-bottom-32
      after:right-0
      after:bg-[url('/vector-33.svg')]
      after:bg-no-repeat
      after:bg-contain
      after:w-150
      after:h-150
      after:z-[1]
      after:opacity-40 sm:after:opacity-60 md:after:opacity-85
    "
    >

      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 flex flex-col items-center px-4">
        <img
          src="/logo-dsx-horizontal.svg"
          className="mb-10 w-40 md:w-70"
          alt="logo-dsx"
        />

        <h2 className="max-w-7xl text-center font-anton uppercase text-white text-3xl sm:text-4xl md:text-6xl mb-10">
          O MAIOR EVENTO DE NEGÓCIOS, MARKETING, VENDAS E INOVAÇÃO DO NORTE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {info.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <h2 className="font-anton text-7xl bg-gradient-to-r from-[#F5D247] to-[#E9A741] bg-clip-text text-transparent">
                {item.number}
              </h2>
              <p className="uppercase text-xl font-extralight text-[#F5D247]">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {/* 🔥 VIDEO (mais nítido) */}
        <div className="mt-12 w-full flex justify-center">
          <div className="w-full max-w-5xl">
            <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-black shadow-xl">
              <iframe
                ref={iframeRef}
                title="Video Evento Vendas"
                // ✅ força qualidade alta (quando disponível) e evita tracking
                src="https://player.vimeo.com/video/1146735494?autoplay=0&muted=0&loop=1&controls=0&title=0&byline=0&portrait=0&playsinline=1&quality=1080p&dnt=1"
                className="
                  absolute inset-0 w-full h-full
                  [transform:translateZ(0)]
                  [backface-visibility:hidden]
                  will-change-transform
                "
                allow="autoplay; fullscreen; picture-in-picture"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />

              {!isPlaying && (
                <div className="absolute inset-0 grid place-items-center bg-black/45 backdrop-blur-[2px]">
                  <button
                    onClick={handlePlay}
                    disabled={!isReady}
                    className="h-14 w-14 flex items-center justify-center disabled:opacity-60"
                  >
                    <img src="/play.svg" alt="play" className="w-20" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-8">
          <CTAButton titulo="Quero meu passaporte" link="#" />
        </div>
      </div>
    </section>
  );
};

export default HeroVendas;
