import React from "react";
import { motion } from "framer-motion";

export default function BotaoWP() {
  return (
    <motion.a
      href="https://chat.whatsapp.com/GXEsJXjFNBi1a3LLAiG90R?mode=gi_t"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 50,
      }}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Falar no WhatsApp"
    >
      {/* Anel pulsando atrás */}
      <motion.span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "rgba(102,178,102,0.4)",
          filter: "blur(1px)",
        }}
        animate={{ scale: [1, 1.6, 1], opacity: [0.55, 0, 0.55] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
      />

      {/* Segundo anel */}
      <motion.span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "rgba(102,178,102,0.25)",
        }}
        animate={{ scale: [1, 1.9, 1], opacity: [0.35, 0, 0.35] }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.35,
        }}
      />

      {/* Corpo do botão */}
      <motion.span
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px",
          borderRadius: "50%",
          background: "#66b266",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Wiggle no ícone */}
        <motion.span
          animate={{ rotate: [0, -8, 8, -6, 6, 0] }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 2.2,
          }}
        >
          <img
            src="/whatsapp.svg"
            width={30}
            height={30}
            alt="WhatsApp"
          />
        </motion.span>
      </motion.span>
    </motion.a>
  );
}
