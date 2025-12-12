import { useState } from "react";

const FormSection = () => {
  const [whatsapp, setWhatsapp] = useState("");

  const handleWhatsappMask = (e) => {
    let value = e.target.value;

    value = value.replace(/\D/g, "");

    if (value.length === 0) {
      setWhatsapp("");
      return;
    }

    value = value.slice(0, 11);

    if (value.length <= 2) {
      value = `(${value}`;
    } else if (value.length <= 6) {
      value = value.replace(/^(\d{2})(\d{0,4})/, "($1) $2");
    } else if (value.length <= 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    } else {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }

    setWhatsapp(value);
  };

  return (
    <section className="pt-10 text-center" id="form">
      <h2 className="font-bebas text-8xl text-white">Save the date</h2>

      <div
        className="
          h-[250px] 
          bg-cover 
          bg-center 
          bg-no-repeat
          flex 
          items-center 
          justify-center
          bg-[url('/background-form-section.png')]
        "
      >
        <img
          className="w-[80%] max-w-[700px]"
          src="/logo-dsx-form.svg"
          alt="logo-dsx"
        />
      </div>

      <h4 className="mt-10 text-white text-4xl font-bebas">
        Entre na lista antecipada e saia na frente
      </h4>

      {/* FORMULÁRIO */}
      <form
        className="
          relative
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-4 
          py-10 
          w-[90%] 
          max-w-[800px] 
          mx-auto
        "
      >
        {/* “pseudo-elemento” de fundo */}
        <div
          className="
            pointer-events-none
            absolute 
            -top-20 
            right-200 
            w-150 
            h-150 
            bg-[url('/Ellipse-form.png')]
            bg-no-repeat 
            bg-contain 
            opacity-100
          "
        />

        {/* conteúdo do form acima do fundo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full col-span-1 md:col-span-2 relative z-10">
          <input
            className="p-3 text-white bg-transparent border border-white rounded-md placeholder-white/70 
                       focus:outline-none focus:border-[#F5A205] transition"
            type="text"
            placeholder="Nome completo:"
          />

          <input
            className="p-3 text-white bg-transparent border border-white rounded-md placeholder-white/70 
                       focus:outline-none focus:border-[#F5A205] transition"
            type="text"
            placeholder="Contato (Whatsapp):"
            value={whatsapp}
            onChange={handleWhatsappMask}
          />

          <input
            className="p-3 text-white bg-transparent border border-white rounded-md placeholder-white/70 
                       focus:outline-none focus:border-[#F5A205] transition"
            type="text"
            placeholder="E-mail:"
          />

          <input
            className="p-3 text-white bg-transparent border border-white rounded-md placeholder-white/70 
                       focus:outline-none focus:border-[#F5A205] transition"
            type="text"
            placeholder="Empresa:"
          />

          <div className="pt-8 flex justify-center items-center md:col-span-2">
            <button className="font-roboto cursor-pointer text-black font-bold bg-[#F5A205] px-8 py-2 rounded-3xl uppercase">
              Enviar
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default FormSection;
