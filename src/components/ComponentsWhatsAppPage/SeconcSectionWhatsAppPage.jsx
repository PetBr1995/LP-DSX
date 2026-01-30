import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";

const SeconcSectionWhatsAppPage = () => {
 
  const [videoStarted, setVideoStarted] = useState(false);
  const iframeRef = useRef(null);


  useEffect(() => {
    if (!iframeRef.current) return;

    const player = new Player(iframeRef.current);

    const onPlay = () => setVideoStarted(true);

    // libera só quando começou a tocar (primeiro frame)
    player.on("play", onPlay);

    // fallback: se der erro, mantém poster (não libera vídeo)
    player.on("error", () => setVideoStarted(false));

    return () => {
      player.off("play", onPlay);
      player.unload?.().catch(() => {});
    };
  }, []);

  return (
    <>
     
      <section className="relative w-full pb-[56%] overflow-hidden bg-black">
        {/* VÍDEO (entra com fade) */}
        <iframe
          ref={iframeRef}
          src="https://player.vimeo.com/video/1146735494?autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0&autopause=0&playsinline=1"
          className={`
            absolute inset-0 w-full h-full pointer-events-none
            transition-opacity duration-700
            ${videoStarted ? "opacity-100" : "opacity-0"}
          `}
          allow="autoplay; fullscreen; picture-in-picture"
        />

        {/* POSTER (some com fade quando o vídeo começar) */}
        <img
          src="/hero-banner.png"
          alt=""
          className={`
            absolute inset-0 w-full h-full object-cover
            transition-opacity duration-700
            ${videoStarted ? "opacity-0" : "opacity-100"}
          `}
        />

        {/* (Opcional) acabamento com gradiente */}
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10" />
      </section>
    </>
  );
};

export default SeconcSectionWhatsAppPage
