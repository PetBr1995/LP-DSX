import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { smoothEase, softEase } from "../utils/motion";

export default function BotaoWPFooter() {
  const [isNearBottom, setIsNearBottom] = useState(false);

  const whatsappHref = "https://wa.me/559294116928";

  useEffect(() => {
    const checkNearBottom = () => {
      const threshold = 220;
      const scrollBottom = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      setIsNearBottom(scrollBottom >= pageHeight - threshold);
    };

    checkNearBottom();
    window.addEventListener("scroll", checkNearBottom, { passive: true });
    window.addEventListener("resize", checkNearBottom);

    return () => {
      window.removeEventListener("scroll", checkNearBottom);
      window.removeEventListener("resize", checkNearBottom);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-[50px] left-[20px] z-[220]">
      <motion.a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        initial={false}
        animate={
          isNearBottom
            ? { opacity: 1, scale: 1, y: 0, pointerEvents: "auto" }
            : { opacity: 0, scale: 0.9, y: 8, pointerEvents: "none" }
        }
        transition={{ duration: 0.5, ease: smoothEase }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        aria-label="Falar no WhatsApp"
        className="relative pointer-events-auto"
      >
        <motion.span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "rgba(102,178,102,0.4)",
            filter: "blur(1px)",
          }}
          animate={{ scale: [1, 1.45, 1], opacity: [0.42, 0, 0.42] }}
          transition={{ duration: 2.1, repeat: Infinity, ease: softEase }}
        />

        <motion.span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "rgba(102,178,102,0.25)",
          }}
          animate={{ scale: [1, 1.7, 1], opacity: [0.25, 0, 0.25] }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: softEase,
            delay: 0.45,
          }}
        />

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
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: softEase }}
        >
          <motion.span
            animate={{ rotate: [0, -4, 4, -3, 3, 0] }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: softEase,
              repeatDelay: 3.1,
            }}
          >
            <img src="/whatsapp.svg" width={30} height={30} alt="WhatsApp" />
          </motion.span>
        </motion.span>
      </motion.a>
    </div>
  );
}
