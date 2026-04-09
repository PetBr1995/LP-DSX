const AudienceSection = ({ items }) => {
  return (
    <div className="border-t border-[#2A2419] bg-[#0F0E0A] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center font-anton text-[30px] uppercase leading-[1.12] text-white md:text-[52px] md:leading-[1.03]">
          O DSX é para você que é...
        </h2>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-3">
          {items.map((profile) => (
            <article
              key={profile.title}
              className="rounded-2xl border border-[#6B5C33] bg-[#1E1A12] p-5 shadow-[inset_0_0_0_1px_rgba(201,168,76,0.08)] md:p-6"
            >
              <h3 className="text-[22px] font-bold leading-[1.18] text-[#C9A84C] md:text-[30px] md:leading-tight">
                {profile.title}
              </h3>
              <p className="mt-3 text-[16px] leading-relaxed text-[#C2B9A3] md:text-[20px]">
                {profile.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AudienceSection;
