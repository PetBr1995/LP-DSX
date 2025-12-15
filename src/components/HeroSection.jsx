import TimerHeader from "./TimerHeader";

const HeroSection = () => {
  return (
    <section className="relative w-full pb-[56%] overflow-hidden bg-black">
      <TimerHeader />


      <iframe
        src="https://player.vimeo.com/video/1145956541?autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0&autopause=0&playsinline=1"
        className="
      absolute
      inset-0
      w-full
      h-full
      pointer-events-none
    "
        allow="autoplay"
      />


      {/* Conteúdo acima do vídeo (se quiser colocar algo depois) */}
      <div className="relative z-10"></div>
    </section>
  );
};

export default HeroSection;
