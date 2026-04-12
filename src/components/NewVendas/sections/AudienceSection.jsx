const AudienceSection = ({ items }) => {
  const getDescriptionWithoutLeadingTitle = (title, description) => {
    const normalizedTitle = title.toLowerCase();
    const normalizedDescription = description.toLowerCase();

    if (!normalizedDescription.startsWith(normalizedTitle)) return description;

    return description.slice(title.length).trim().replace(/^[,.-]\s*/, "");
  };

  return (
    <div className="bg-black py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center font-anton text-[30px] uppercase leading-[1.12] text-white md:text-[52px] md:leading-[1.03]">
          Para quem é o DSX:
        </h2>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((profile) => (
            <article
              key={profile.description}
              className="flex h-full min-h-[176px] items-center rounded-2xl border border-[#6B5C33] bg-[#1E1A12] p-5 shadow-[inset_0_0_0_1px_rgba(201,168,76,0.08)] md:min-h-[196px] md:p-6"
            >
              <div className="flex w-full flex-col items-center gap-4 text-center md:items-start md:text-left">
                <img
                  src={profile.icon}
                  alt=""
                  aria-hidden="true"
                  className="h-14 w-14 shrink-0 brightness-0 invert"
                />
                <p className="font-jamjuree text-[15px] font-normal leading-relaxed text-white md:text-[18px]">
                  <span className="font-bold text-[#F5C02B]">{profile.title}</span>{" "}
                  {getDescriptionWithoutLeadingTitle(profile.title, profile.description)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AudienceSection;

