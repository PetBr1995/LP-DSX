const AudienceSection = ({ items }) => {
  const splitSubtitleAndBody = (description = "") => {
    const text = description.trim();
    const match = text.match(/^(.*?[.!?])\s+(.*)$/);

    if (!match) {
      return { subtitle: text, body: "" };
    }

    return {
      subtitle: match[1],
      body: match[2],
    };
  };

  return (
    <div className="bg-black py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center font-anton text-[30px] uppercase leading-[1.12] text-white md:text-[52px] md:leading-[1.03]">
          Para quem é o DSX:
        </h2>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((profile) => {
            const { subtitle, body } = splitSubtitleAndBody(profile.description);

            return (
              <article
                key={profile.description}
                className="flex h-full min-h-[210px] items-start rounded-2xl border border-[#6B5C33] bg-[#1E1A12] p-5 shadow-[inset_0_0_0_1px_rgba(201,168,76,0.08)] md:min-h-[230px] md:p-6"
              >
                <div className="flex w-full flex-col items-start gap-4 text-left">
                  <h2 className="font-anton text-[26px] uppercase leading-none text-[#F5C02B] md:text-[30px]">
                    {profile.title}
                  </h2>

                  <div className="w-full space-y-2">
                    <p className="border-l-2 border-[#F5C02B]/70 pl-3 font-jamjuree text-[14px] font-semibold leading-snug text-[#F5C02B] md:text-[16px]">
                      {subtitle}
                    </p>
                    {body ? (
                      <p className="font-jamjuree text-[14px] font-normal leading-relaxed text-white/90 md:text-[16px]">
                        {body}
                      </p>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AudienceSection;
