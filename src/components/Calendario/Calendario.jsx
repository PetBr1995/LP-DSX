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

const DIAS_SEMANA_PT = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
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
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupError, setPopupError] = useState("");
  const [popupStatus, setPopupStatus] = useState("idle");
  const [popupMessage, setPopupMessage] = useState("");
  const [selectedHorario, setSelectedHorario] = useState("10:00");
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

  const selectedLabel = `${selectedDate.getDate()} de ${
    MESES_PT[selectedDate.getMonth()]
  } de ${selectedDate.getFullYear()}`;
  const isDayAvailable = (dateValue) => {
    const weekDay = dateValue.getDay(); // 0 domingo, 6 sabado
    if (weekDay === 0 || weekDay === 6) return false;
    const hour = Number(selectedHorario.split(":")[0]);
    return (dateValue.getDate() + hour) % 3 !== 0;
  };
  const selectedDateIsAvailable = isDayAvailable(selectedDate);
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
    if (isDayAvailable(selectedDate)) return;
    const firstAvailable = dayCells.find((item) => item && isDayAvailable(item));
    if (firstAvailable) setSelectedDate(firstAvailable);
  }, [selectedHorario, currentMonth, dayCells]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="rounded-[28px] bg-[#f8f8f8] p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] sm:p-6">
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() - 1,
                  1,
                ),
              )
            }
            className="font-jamjuree text-lg text-[#9ca3af] transition hover:text-[#2f2f33]"
            aria-label="Mes anterior"
          >
            ‹
          </button>
          <h2 className="font-jamjuree text-2xl font-bold text-[#2f2f33]">
            {monthLabel}
          </h2>
          <button
            type="button"
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() + 1,
                  1,
                ),
              )
            }
            className="font-jamjuree text-lg text-[#9ca3af] transition hover:text-[#2f2f33]"
            aria-label="Proximo mes"
          >
            ›
          </button>
        </div>
        <p className="font-jamjuree text-sm font-semibold text-[#8b8f98]">
          Data escolhida: <span className="text-[#2f2f33]">{selectedLabel}</span>
        </p>
      </header>

      <div className="mb-4">
        <label className="mb-1 block font-jamjuree text-sm font-semibold text-[#6b7280]">
          Selecione primeiro o horario da reuniao
        </label>
        <select
          value={selectedHorario}
          onChange={(event) => setSelectedHorario(event.target.value)}
          className="h-11 w-full rounded-xl border border-[#d1d5db] bg-white px-3 font-jamjuree text-sm text-[#2f2f33] outline-none focus:border-[#2f2f33] sm:max-w-[220px]"
        >
          {HORARIOS_DISPONIVEIS.map((horario) => (
            <option key={horario} value={horario}>
              {horario}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3 grid grid-cols-7 gap-2">
        {DIAS_SEMANA_PT.map((day) => (
          <span
            key={day}
            className="text-center font-jamjuree text-sm text-[#b1b5be]"
          >
            {day}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 sm:gap-2.5">
        {dayCells.map((dateValue, index) => {
          if (!dateValue) {
            return (
              <div
                key={`empty-${index}`}
                className="h-11 rounded-2xl border border-transparent sm:h-12"
              />
            );
          }

          const isSelected =
            dateValue.getDate() === selectedDate.getDate() &&
            dateValue.getMonth() === selectedDate.getMonth() &&
            dateValue.getFullYear() === selectedDate.getFullYear();
          const isAvailable = isDayAvailable(dateValue);
          const isToday =
            dateValue.getDate() === today.getDate() &&
            dateValue.getMonth() === today.getMonth() &&
            dateValue.getFullYear() === today.getFullYear();

          return (
            <button
              type="button"
              key={`${dateValue.toISOString()}-${index}`}
              onClick={() => handleOpenPopup(dateValue)}
              disabled={!isAvailable}
              className={`relative flex h-11 items-center justify-center rounded-2xl border bg-[#f4f4f5] font-jamjuree text-sm transition sm:h-12 ${
                !isAvailable
                  ? "cursor-not-allowed border-[#eceff3] text-[#c2c7d0] opacity-55"
                  : isSelected
                  ? "border-[#ff8f84] text-[#2f2f33] shadow-[inset_0_0_0_1px_rgba(255,143,132,0.35)]"
                  : "border-[#ebedf0] text-[#3f3f46] hover:border-[#d0d4db]"
              }`}
              aria-label={`Selecionar dia ${dateValue.getDate()}`}
            >
              <span>{dateValue.getDate()}</span>
              {isToday ? (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-[#2f2f33]" />
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => handleOpenPopup(selectedDate)}
          disabled={!selectedDateIsAvailable}
          className="rounded-xl bg-[#2f2f33] px-4 py-2.5 font-jamjuree text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Agendar reuniao neste dia
        </button>
        <a
          href="/"
          className="rounded-xl border border-[#d9dce2] bg-white px-4 py-2.5 font-jamjuree text-sm font-semibold text-[#52525b] transition hover:bg-[#f2f2f4]"
        >
          Voltar para inicio
        </a>
      </div>

      {isPopupOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
            <h3 className="font-jamjuree text-xl font-bold text-[#2f2f33]">
              Confirmar agendamento
            </h3>
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
