import { useEffect, useMemo, useState } from "react";

function format2(value) {
  return String(value).padStart(2, "0");
}

function getProgressData(now) {
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(endOfDay.getDate() + 1);

  const totalMs = endOfDay - startOfDay;
  const elapsedMs = now - startOfDay;
  const remainingMs = Math.max(0, endOfDay - now);
  const progress = Math.min(100, Math.max(0, (elapsedMs / totalMs) * 100));

  const hours = Math.floor(remainingMs / 3600000);
  const minutes = Math.floor((remainingMs % 3600000) / 60000);
  const seconds = Math.floor((remainingMs % 60000) / 1000);

  return { progress, hours, minutes, seconds };
}

export default function FaixaSegundoLoteHomeTeste() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { hours, minutes, seconds } = useMemo(
    () => getProgressData(now),
    [now]
  );

  return (
    <div className="mt-6 px-4 sm:px-6 flex justify-center">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-lg border border-[#FF6B6B]/35 bg-[#1A0E10] px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2A1115] via-[#341318] to-[#2A1115]" />

        <div className="relative z-10">
          <div className="flex items-center justify-between gap-3 text-[11px] sm:text-xs uppercase tracking-wider">
            <span className="text-sm sm:text-base font-black text-[#FFD0D0]">95% DO 2º LOTE VENDIDO</span>
            <span className="font-black text-white">
              {format2(hours)}:{format2(minutes)}:{format2(seconds)}
            </span>
          </div>

          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/15">
            <div
              className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-[#FF6B6B] via-[#FF3D3D] to-[#D61C1C] transition-[width] duration-700 ease-linear"
              style={{ width: "95%" }}
            >
              <span
                className="absolute inset-y-0 -left-1/3 w-1/3 bg-white/40 blur-[1px]"
                style={{
                  transform: "skewX(-20deg)",
                  animation: "bar-reflex 2.2s ease-in-out infinite",
                }}
              />
            </div>
          </div>

          <p className="mt-2 text-center text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-[#FFD0D0]">
            2º lote vira em
          </p>
        </div>
      </div>
      <style>{`
        @keyframes bar-reflex {
          0% { left: -35%; opacity: 0; }
          25% { opacity: 0.8; }
          100% { left: 130%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
