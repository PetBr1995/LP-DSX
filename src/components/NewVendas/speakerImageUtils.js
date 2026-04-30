const optimizedSpeakerBaseByOriginal = {
  "/novas-palestrantes/foto-joao-branco.png": "/optimized/foto-joao-branco",
  "/novas-palestrantes/Joao-Kepler.png":
    "/optimized/novas-palestrantes/Joao-Kepler",
  "/novas-palestrantes/foto-netao-bom-beef.PNG": "/optimized/foto-netao-bom-beef",
  "/novas-palestrantes/Fernando-Miranda.png":
    "/optimized/novas-palestrantes/Fernando-Miranda",
  "/novas-palestrantes/Nicolas-Charao.png":
    "/optimized/novas-palestrantes/Nicolas-Charao",
  "/novas-palestrantes/foto-carolina-lima.png": "/optimized/foto-carolina-lima",
  "/novas-palestrantes/Roberto-Reis.png":
    "/optimized/novas-palestrantes/Roberto-Reis",
  "/palestrantes/AfranioSoares.png": "/optimized/palestrantes/AfranioSoares",
  "/novas-palestrantes/foto-breno-maciel.png": "/optimized/foto-breno-maciel",
  "/novas-palestrantes/foto-carlos-oshiro.png": "/optimized/foto-carlos-oshiro",
  "/novas-palestrantes/foto-chay-santos.png": "/optimized/foto-chay-santos",
  "/novas-palestrantes/Flavia-Sausmikat.png":
    "/optimized/novas-palestrantes/Flavia-Sausmikat",
  "/palestrantes/FabricioAlva.png": "/optimized/palestrantes/FabricioAlva",
  "/novas-palestrantes/foto-giselle-oshiro.png":
    "/optimized/novas-palestrantes/foto-giselle-oshiro",
  "/palestrantes/MagnoRodrigues.png": "/optimized/palestrantes/MagnoRodrigues",
  "/palestrantes/SuellenScop.png": "/optimized/palestrantes/SuellenScop",
};

export function getSpeakerImageSources(originalPath = "") {
  const base = optimizedSpeakerBaseByOriginal[originalPath];

  if (!base) {
    return {
      avif: "",
      webp: "",
      fallback: originalPath,
    };
  }

  return {
    avif: `${base}.avif`,
    webp: `${base}.webp`,
    fallback: originalPath,
  };
}
