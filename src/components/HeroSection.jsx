import TimerHeader from "./TimerHeader";

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <TimerHeader />

      {/* Fundo — Vimeo FULL COVER */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src="https://player.vimeo.com/video/1145956541?autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0&autopause=0&playsinline=1"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          className="
            absolute 
            top-1/2 
            left-1/2 
            -translate-x-1/2 
            -translate-y-1/2
            w-full 
            h-full
            scale-[1.25]       /* 👈 aumenta o vídeo pra sumir as bordas */
            pointer-events-none
          "
        />
      </div>

      {/* Conteúdo acima do vídeo (se quiser colocar algo depois) */}
      <div className="relative z-10"></div>
    </section>
  );
};

export default HeroSection;
