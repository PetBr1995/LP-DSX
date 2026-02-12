import { motion } from "framer-motion";

export default function FaixaLote() {
    return (
        <div className="mt-6 px-4 sm:px-6 flex justify-center">
            <motion.div
                className="
          relative overflow-hidden
          w-full max-w-2xl
          px-4 py-2.5 sm:px-6 sm:py-3
          rounded-md sm:rounded-lg
          text-center uppercase font-black text-white
          text-sm sm:text-base md:text-lg
          tracking-wide sm:tracking-widest
          shadow-lg
        "
                // fundo mais “premium” sem perder o vermelho
                style={{
                    background:
                        "linear-gradient(90deg, #ef4444 0%, #dc2626 50%, #ef4444 100%)",
                }}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{
                    opacity: 1,
                    scale: [1, 1.045, 1],
                    boxShadow: [
                        "0 10px 25px rgba(0,0,0,0.22), 0 0 0 rgba(239,68,68,0)",
                        "0 14px 35px rgba(0,0,0,0.28), 0 0 18px rgba(239,68,68,0.35)",
                        "0 10px 25px rgba(0,0,0,0.22), 0 0 0 rgba(239,68,68,0)",
                    ],
                }}
                transition={{
                    opacity: { duration: 0.4 },
                    scale: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
                    boxShadow: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
                }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.98 }}
            >
                {/* shimmer sutil passando */}
                <motion.span
                    className="absolute inset-y-0 -left-1/2 w-1/3 bg-white/20"
                    style={{ transform: "skewX(-25deg)" }}
                    animate={{ left: ["-50%", "120%"] }}
                    transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        repeatDelay: 2.8,
                        ease: "easeInOut",
                    }}
                />

                {/* conteúdo */}
                <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
                    1° lote promocional
                </span>
            </motion.div>
        </div>
    );
}
