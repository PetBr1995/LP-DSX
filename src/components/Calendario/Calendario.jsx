import { useEffect, useMemo, useState } from "react";

const MESES_PT = [
  "Janeiro",
  "Fevereiro",
  "Marco",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const DIAS_ABREV = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
const HORARIOS_DISPONIVEIS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const pad2 = (value) => String(value).padStart(2, "0");

const toGoogleDateTime = (date, hour = 10, minute = 0) => {
  const year = date.getFullYear();
  const month = pad2(date.getMonth() + 1);
  const day = pad2(date.getDate());
  const hh = pad2(hour);
  const mm = pad2(minute);
  return `${year}${month}${day}T${hh}${mm}00`;
};

const Calendario = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedHorario, setSelectedHorario] = useState("10:00");
  const [dayWindowStart, setDayWindowStart] = useState(0);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupError, setPopupError] = useState("");
  const [popupStatus, setPopupStatus] = useState("idle");
  const [popupMessage, setPopupMessage] = useState("");
  const [leadData, setLeadData] = useState({
    nome: "",
    email: "",
    telefone: "",
  });

  const monthLabel = `${MESES_PT[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;

  const dayCells = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const totalDays = new Date(year, month + 1, 0).getDate();
    const mondayBasedOffset = (firstDay.getDay() + 6) % 7;

    const cells = [];
    for (let i = 0; i < mondayBasedOffset; i += 1) cells.push(null);
    for (let day = 1; day <= totalDays; day += 1) {
      cells.push(new Date(year, month, day));
    }
    return cells;
  }, [currentMonth]);

  const isDayAvailable = (dateValue) => {
    const weekDay = dateValue.getDay();
    if (weekDay === 0 || weekDay === 6) return false;
    const hour = Number(selectedHorario.split(":")[0]);
    return (dateValue.getDate() + hour) % 3 !== 0;
  };

  const availableDays = useMemo(
    () => dayCells.filter((item) => item && isDayAvailable(item)),
    [dayCells, selectedHorario],
  );

  const visibleDays = availableDays.slice(dayWindowStart, dayWindowStart + 2);

  const selectedLabel = `${DIAS_ABREV[selectedDate.getDay()]} ${pad2(
    selectedDate.getDate(),
  )}/${pad2(selectedDate.getMonth() + 1)}`;

  const isEmailValido = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());

  const handleOpenPopup = (dateValue) => {
    if (!isDayAvailable(dateValue)) return;
    setSelectedDate(dateValue);
    setPopupError("");
    setPopupStatus("idle");
    setPopupMessage("");
    setIsPopupOpen(true);
  };

  const handleConfirmMeeting = async () => {
    if (!leadData.nome.trim()) {
      setPopupError("Informe seu nome.");
      return;
    }
    if (!isEmailValido(leadData.email)) {
      setPopupError("Informe um e-mail valido.");
      return;
    }
    if (!leadData.telefone.trim()) {
      setPopupError("Informe seu telefone.");
      return;
    }

    setPopupError("");
    setPopupStatus("loading");

    const params = new URLSearchParams(window.location.search);

    const payload = {
      nome: leadData.nome.trim(),
      email: leadData.email.trim().toLowerCase(),
      telefone: leadData.telefone.trim(),
      horario: selectedHorario,
      data_agendada: toGoogleDateTime(selectedDate, 0, 0).slice(0, 8),
      origem: "lp-newvendas",
      observacoes: "",
      utm_source: params.get("utm_source") || null,
      utm_medium: params.get("utm_medium") || null,
      utm_campaign: params.get("utm_campaign") || null,
      utm_term: params.get("utm_term") || null,
      utm_content: params.get("utm_content") || null,
      page_url: window.location.href,
    };

    try {
      const apiUrl = import.meta.env.VITE_AGENDAMENTO_API_URL;
      if (apiUrl) {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Falha ao salvar agendamento na API.");
        }
      } else {
        await new Promise((resolve) => {
          window.setTimeout(resolve, 500);
        });
      }

      setPopupStatus("success");
      setPopupMessage("Agendamento concluido com sucesso.");

      window.setTimeout(() => {
        window.location.href = "/";
      }, 1200);
    } catch {
      setPopupStatus("idle");
      setPopupError("Nao foi possivel concluir o agendamento. Tente novamente.");
    }
  };

  useEffect(() => {
    if (availableDays.length === 0) return;
    const stillAvailable = availableDays.some(
      (day) => day.toDateString() === selectedDate.toDateString(),
    );
    if (!stillAvailable) setSelectedDate(availableDays[0]);
  }, [availableDays, selectedDate]);

  useEffect(() => {
    setDayWindowStart(0);
  }, [selectedHorario, currentMonth]);

  const canGoPrevDays = dayWindowStart > 0;
  const canGoNextDays = dayWindowStart + 2 < availableDays.length;

  return (
    <section className="overflow-hidden rounded-2xl bg-[#012642] shadow-[0_20px_50px_rgba(0,0,0,0.24)]">
      <div className="px-5 pb-6 pt-5 text-white sm:px-7">
        <div className="flex items-center justify-end border-b border-white/40 pb-4">
          <p className="font-jamjuree text-lg font-semibold">Programas Presenciais</p>
        </div>

        <div className="mt-5 flex items-start justify-between gap-3">
          <div>
            <p className="font-jamjuree text-4xl font-bold leading-none">Ultimo passo:</p>
            <p className="mt-2 font-jamjuree text-xl font-semibold">Entrevista para validacao do seu perfil</p>
          </div>
          <div className="shrink-0 rounded-full border border-[#f9cc8b] px-3 py-1 font-jamjuree text-sm font-bold text-[#f9cc8b]">
            01:28
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-jamjuree text-sm text-white/70">Mes</p>
            <p className="font-jamjuree text-lg font-semibold">{monthLabel}</p>
          </div>
          <div>
            <label className="mb-1 block font-jamjuree text-sm text-white/75">Horario da reuniao</label>
            <select
              value={selectedHorario}
              onChange={(event) => setSelectedHorario(event.target.value)}
              className="h-10 min-w-[130px] rounded-lg border border-white/25 bg-[#073354] px-3 font-jamjuree text-sm text-white outline-none"
            >
              {HORARIOS_DISPONIVEIS.map((horario) => (
                <option key={horario} value={horario}>
                  {horario}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => canGoPrevDays && setDayWindowStart((prev) => prev - 1)}
            disabled={!canGoPrevDays}
            className="grid h-10 w-10 place-items-center rounded-full bg-[#001a2f] text-xl disabled:opacity-40"
          >
            ‹
          </button>

          <div className="grid flex-1 grid-cols-2 gap-3">
            {visibleDays.map((day) => {
              const isSelected = day.toDateString() === selectedDate.toDateString();
              const dayShort = DIAS_ABREV[day.getDay()];
              const dayFull = `${pad2(day.getDate())}/${pad2(day.getMonth() + 1)}`;

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => setSelectedDate(day)}
                  className={`rounded-xl border px-3 py-3 text-center font-jamjuree transition ${
                    isSelected
                      ? "border-[#ff7e66] bg-white/10"
                      : "border-white/20 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <p className="text-sm font-semibold text-white/75">{dayShort}</p>
                  <p className="text-3xl font-bold text-white">{dayFull}</p>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => canGoNextDays && setDayWindowStart((prev) => prev + 1)}
            disabled={!canGoNextDays}
            className="grid h-10 w-10 place-items-center rounded-full bg-[#001a2f] text-xl disabled:opacity-40"
          >
            ›
          </button>
        </div>
      </div>

      <div className="bg-[#f5f6f8] px-5 pb-6 pt-5 sm:px-7">
        <p className="mb-3 font-jamjuree text-sm font-semibold text-[#4b5563]">
          Horarios disponiveis para {selectedLabel}
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {HORARIOS_DISPONIVEIS.map((horario) => {
            const isChosen = horario === selectedHorario;
            return (
              <button
                key={horario}
                type="button"
                onClick={() => setSelectedHorario(horario)}
                className={`h-11 rounded-lg border font-jamjuree text-lg font-semibold transition ${
                  isChosen
                    ? "border-[#233c69] bg-[#233c69] text-white"
                    : "border-[#7b86a5] bg-white text-[#384562] hover:bg-[#eef1f6]"
                }`}
              >
                {horario}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => handleOpenPopup(selectedDate)}
            className="rounded-lg bg-[#102d56] px-5 py-2.5 font-jamjuree text-sm font-bold uppercase tracking-[0.08em] text-white"
          >
            Confirmar horario
          </button>
        </div>
      </div>

      {isPopupOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
            <h3 className="font-jamjuree text-xl font-bold text-[#2f2f33]">Confirmar agendamento</h3>
            <p className="mt-1 font-jamjuree text-sm text-[#6b7280]">
              Reuniao para {selectedLabel} as {selectedHorario}
            </p>

            <div className="mt-4 space-y-3">
              <input
                type="text"
                value={leadData.nome}
                onChange={(event) =>
                  setLeadData((prev) => ({ ...prev, nome: event.target.value }))
                }
                placeholder="Seu nome"
                className="h-11 w-full rounded-xl border border-[#d1d5db] px-3 font-jamjuree text-sm outline-none focus:border-[#2f2f33]"
              />
              <input
                type="email"
                value={leadData.email}
                onChange={(event) =>
                  setLeadData((prev) => ({ ...prev, email: event.target.value }))
                }
                placeholder="Seu e-mail"
                className="h-11 w-full rounded-xl border border-[#d1d5db] px-3 font-jamjuree text-sm outline-none focus:border-[#2f2f33]"
              />
              <input
                type="tel"
                value={leadData.telefone}
                onChange={(event) =>
                  setLeadData((prev) => ({ ...prev, telefone: event.target.value }))
                }
                placeholder="Seu telefone"
                className="h-11 w-full rounded-xl border border-[#d1d5db] px-3 font-jamjuree text-sm outline-none focus:border-[#2f2f33]"
              />
            </div>

            {popupError ? (
              <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 font-jamjuree text-sm text-red-700">
                {popupError}
              </p>
            ) : null}

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsPopupOpen(false)}
                className="rounded-xl border border-[#d1d5db] px-4 py-2 font-jamjuree text-sm font-semibold text-[#4b5563]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmMeeting}
                disabled={popupStatus === "loading"}
                className="rounded-xl bg-[#2f2f33] px-4 py-2 font-jamjuree text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {popupStatus === "loading" ? "Confirmando..." : "Confirmar agendamento"}
              </button>
            </div>

            {popupStatus === "success" && popupMessage ? (
              <p className="mt-3 rounded-lg bg-green-50 px-3 py-2 font-jamjuree text-sm text-green-700">
                {popupMessage}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Calendario;
