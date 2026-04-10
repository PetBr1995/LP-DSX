import "./NewVendasHeaderMask.css";

const NewVendasHeaderMask = ({
  titulo,
  textColor,
  backgroundColor,
  link,
  target,
  font,
  size = "md",
}) => {
  const isLarge = size === "lg";

  return (
    <a href={link} target={target} rel={target === "_blank" ? "noreferrer" : undefined}>
      <section className="font-jamjuree relative z-10 flex items-center justify-center">
        <div className="group nv-mask-shell relative rounded-2xl bg-gradient-to-r from-[#8E3EEB] to-[#E0474A] p-[2px] shadow-[0_0_0_1px_rgba(224,71,74,0.2)] transition-all duration-300 hover:scale-[1.06] hover:shadow-[0_14px_34px_rgba(224,71,74,0.35)] active:scale-[0.98]">
          <div
            className={`relative flex items-center justify-center overflow-hidden rounded-[14px] ${
              isLarge ? "h-12 min-w-[248px] px-6" : "h-11 min-w-[220px] px-5"
            }`}
            style={{ backgroundColor }}
          >
            <span className="nv-mask-shine pointer-events-none absolute inset-y-0 -left-[40%] w-[36%] rotate-12 bg-white/30 blur-sm transition-transform duration-500 ease-out group-hover:translate-x-[430%]" />

            <div className="nv-mask-glow pointer-events-none absolute inset-0 rounded-[14px] bg-gradient-to-r from-[#8E3EEB] to-[#E0474A] opacity-45 blur-md transition-opacity duration-300 group-hover:opacity-65" />

            <p
              className={`relative uppercase text-center leading-none ${
                isLarge ? "text-[15px]" : "text-[14px]"
              }`}
              style={{ fontWeight: font, color: textColor }}
            >
              {titulo}
            </p>
          </div>
        </div>
      </section>
    </a>
  );
};

export default NewVendasHeaderMask;
