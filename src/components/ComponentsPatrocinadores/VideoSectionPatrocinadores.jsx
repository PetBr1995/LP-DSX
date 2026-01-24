import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import { img } from "framer-motion/client";


const VideoSectionPatrocinadores = () => {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

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

    player.on("error", () => {
      setIsReady(false);
      setIsPlaying(false);
    });

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

      // Se você quiser COM SOM, precisa ser por clique (ok)
      await player.setMuted(false).catch(() => {});
      await player.setVolume(1).catch(() => {});

      await player.play();
    } catch (e) {
      // se o navegador barrar, tenta mutado (quase sempre vai)
      try {
        const player = playerRef.current;
        if (!player) return;
        await player.setMuted(true);
        await player.play();
      } catch {}
    }
  };

  return (
    <section className="bg-black py-12">
      <div className="mx-auto max-w-6xl px-4 grid gap-6">
        {/* Container 16:9 */}
        <div className="relative w-[85%] mx-auto aspect-video overflow-hidden rounded-2xl bg-black">
          {/* Iframe */}
          <iframe
            ref={iframeRef}
            title="Video Patrocinadores"
            src="https://player.vimeo.com/video/1146735494?autoplay=0&muted=0&loop=1&controls=0&title=0&byline=0&portrait=0&autopause=0&playsinline=1"
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
          />

          {/* Overlay com CTA (só aparece quando não está tocando) */}
          {!isPlaying && (
            <div className="absolute inset-0 grid place-items-center bg-black/45 backdrop-blur-[2px]">
              <button
                type="button"
                onClick={handleStart}
                disabled={!isReady}
                className="
                  cursor-pointer
                  h-12 px-6 rounded-xl
                  text-white font-semibold
                  shadow-lg
                  hover:scale-[1.02] hover:shadow-xl
                  transition-all duration-300
                  uppercase
                  disabled:opacity-60 disabled:cursor-not-allowed
                "
              >
                <img src="/play.svg" alt="play-icon" />
              </button>
            </div>
          )}
        </div>

        {/* Botão de patrocínio (se quiser manter separado do play) */}
        <div className="flex justify-center">
          <button
            type="button"
            className="
              cursor-pointer
              h-11 px-6 rounded-xl
              bg-gradient-to-r from-[#913DE3] via-[#A83EAA] to-[#C34484]
              text-white font-semibold
              shadow-lg
              hover:scale-[1.02] hover:shadow-xl
              transition-all duration-300
              uppercase
            "
          >
            Quero patrocinar
          </button>
        </div>
      </div>
    </section>
  );
};

export default VideoSectionPatrocinadores;
