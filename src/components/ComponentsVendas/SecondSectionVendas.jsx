import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import CTAButton from "../Mascaras/CTAButton";

const SecondSectionVendas = () => {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const inf = [
    { icon: "/vector-16.svg", text: "Clareza do que priorizar" },
    { icon: "/vector-9.svg", text: "Networking com líderes e empresários" },
    { icon: "/vector-35.svg", text: "Métodos aplicáveis no seu negócio" },
    {
      icon: "/vector-36.svg",
      text: "Insights para vender melhor e operar com mais eficiência",
    },
    {
      icon: "/vector-15.svg",
      text: "Insights para vender melhor e operar com mais eficiência",
    },
    {
      icon: "/vector-5.svg",
      text: "Insights para vender melhor e operar com mais eficiência",
    },
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
      player.unload?.().catch(() => {});
    };
  }, []);

  const handleStart = async () => {
    try {
      const player = playerRef.current;
      if (!player) return;
      await player.play();
    } catch {}
  };

  return (
    <section
      className="
        relative py-10 overflow-hidden
        after:absolute after:content-[''] after:inset-0
        after:bg-[url('/fundo-faq-patrocinadores.png')]
        after:bg-cover after:bg-center after:bg-no-repeat
        after:z-[1]
      "
    >
      <div className="absolute inset-0 bg-black/50 z-[2]" />

      <div className="relative z-[3] max-w-7xl mx-auto px-4">
        {/* Título */}
        <h2
          className="
    font-anton
    uppercase
    text-white
    text-3xl sm:text-4xl md:text-5xl lg:text-6xl
    leading-[1.3]
    sm:leading-[1.3]
    md:leading-[1.3]
    lg:leading-[1.3]
    text-center
    mb-6
  "
        >
          Dois dias para alinhar visão, estratégia e execução
          <br />
          em um mercado que não aceita mais improviso.
        </h2>

        <p className="uppercase font-extralight text-white text-sm sm:text-base md:text-xl text-center mb-10">
          Você vai sair com:
        </p>

        {/* 🔲 CARDS */}
        <div className="w-full">
          <div
            className="
              grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
              gap-4 sm:gap-6
            "
          >
            {inf.map((item, index) => (
              <div
                key={index}
                className="
                  bg-linear-to-r from-[#FFFFFF] to-[#F5D247]
                  p-px rounded-md
                  w-full
                "
              >
                <div
                  className="
                    bg-black rounded-md
                    h-40 sm:h-45
                    flex items-center
                    gap-4
                    px-6
                  "
                >
                  <img
                    src={item.icon}
                    alt="item"
                    className="w-10 sm:w-12 shrink-0"
                  />

                  <h3 className="text-white uppercase text-sm sm:text-base leading-snug">
                    {item.text}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🎥 VIDEO */}
        <div className="mb-12 mt-12">
          <div className="relative w-full mx-auto aspect-video overflow-hidden rounded-2xl bg-black shadow-xl">
            <iframe
              ref={iframeRef}
              title="Video Evento Vendas"
              src="https://player.vimeo.com/video/1146735494?autoplay=0&muted=0&loop=1&controls=0&title=0&byline=0&portrait=0&autopause=0&playsinline=1"
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
            />
          </div>
        </div>

        <div className="mt-8">
          <CTAButton titulo="Quero meu passaporte" link="/" />
        </div>
      </div>
    </section>
  );
};

export default SecondSectionVendas;
