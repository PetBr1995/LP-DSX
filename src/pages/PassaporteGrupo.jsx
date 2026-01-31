import { useNavigate } from "react-router-dom";

const PassaporteGrupo = () => {
  const inf = [
    {
      qtdPessoas: "5",
      valor: "282,15",
      valorParcela: "xx,xx",
      icon: "/vector-5.svg",
      porCentoOff: "5% OFF",
    },
    {
      qtdPessoas: "10",
      valor: "267,30",
      valorParcela: "xx,xx",
      icon: "/vector-9.svg",
      porCentoOff: "10% OFF",
    },
  ];

  const navigate = useNavigate();

  return (
    <section className="py-8 px-4 max-w-7xl mx-auto flex justify-center gap-2 flex-wrap">
      {inf.map((item, index) => (
        <div
          key={index}
          className="
              relative p-px w-[350px] rounded-3xl
              bg-linear-to-b from-[#F5D247] to-[#797979]
              overflow-hidden
            "
        >
          {/* fundo decorativo (continua no wrapper) */}
          <div
            className="
                absolute top-0 right-0 z-0
                bg-[url('/fundo-passaporte.svg')]
                bg-center bg-no-repeat bg-cover
                w-[200px] h-[80px]
                z-20
              "
          />

          {/* conteúdo */}
          <div
            style={{ "--icon": `url('${item.icon}')` }}
            className="
                relative z-10 py-2 px-10 bg-[#111111] rounded-3xl w-full h-full
  
                before:absolute before:content-['']
                before:-top-10 before:-right-10
                before:bg-no-repeat before:bg-cover before:bg-center
                before:bg-[image:var(--icon)]
                before:w-[130px] before:h-[130px]
                before:z-10
              "
          >
            <p className="text-white font-extralight uppercase">In group</p>

            {/* Agora esse texto fica por cima do ícone SEM falhar */}
            <h2 className="relative z-20 text-6xl text-white uppercase font-anton">
              {item.qtdPessoas} pessoas
            </h2>

            <div className="mt-6 relative z-20">
              <div className="flex justify-center items-center">
                <p className="font-medium text-white text-sm w-[50%] text-center uppercase font-extralight p-1 border border-white rounded-xl">
                  {item.porCentoOff}
                </p>
              </div>

              <h2 className="uppercase font-extrabold text-5xl mt-4 bg-gradient-to-r from-[#F2C845] to-[#E7A440] bg-clip-text text-transparent">
                R$ {item.valor}
              </h2>

              <p className="text-white uppercase">Por pessoa</p>

              <button
                onClick={() =>
                  window.open("https://hub.la/r/EREq9bO1fsVKl6sG7Axo", "_blank")
                }
                className="w-full p-2 rounded-xl my-8 cursor-pointer font-bold uppercase bg-linear-to-r from-[#F3CB46] to-[#E7A240]"
              >
                Comprar agora
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default PassaporteGrupo;
