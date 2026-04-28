import Calendario from "../components/Calendario/Calendario";

const CalendarioPage = () => {
  return (
    <main className="min-h-screen bg-[#e7e7e8] px-4 py-10 sm:px-6">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-6 rounded-2xl bg-[#2f2f33] px-5 py-6 text-white shadow-lg sm:px-7">
          <p className="font-jamjuree text-xs uppercase tracking-[0.12em] text-white/75">
            Digital Summit Experience 2026
          </p>
          <h1 className="mt-2 font-jamjuree text-3xl font-bold leading-tight">
            Inscricao confirmada
          </h1>
          <p className="mt-2 font-jamjuree text-sm text-white/90">
            Agora o proximo passo e colocar o evento no seu calendario.
          </p>
        </header>
        <Calendario />
      </div>
    </main>
  );
};

export default CalendarioPage;
