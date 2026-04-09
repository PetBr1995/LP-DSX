const FooterSection = () => {
  return (
    <footer className="relative border-t border-[#2F2717] bg-[#0F0E0A] px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-6 text-center">
        <p className="text-[12px] text-[#A79B83] md:text-[13px]">
          Pagamento 100% seguro · Parcelamento em até 12x
        </p>

        <div className="border-t border-[#2A2419] pt-6">
          <p className="text-[11px] text-[#A79B83] md:text-[12px]">
            DSX — Digital Summit Experience © 2026 · Realização: Digital Hub Experience
          </p>
          <p className="mt-1 text-[11px] text-[#A79B83] md:text-[12px]">
            Este site não faz parte do website do Facebook ou do Facebook Inc.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
