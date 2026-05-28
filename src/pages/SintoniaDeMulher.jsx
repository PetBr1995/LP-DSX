import NewVendas from "./NewVendas";

const SINTONIA_DE_MULHER_SYMPLA_URL =
  "https://www.sympla.com.br/evento/dsx-2026---digital-summit-experience/3339721?d=SINTONIA20";

const SintoniaDeMulher = () => (
  <NewVendas
    symplaUrl={SINTONIA_DE_MULHER_SYMPLA_URL}
    showDiscountedPrices
  />
);

export default SintoniaDeMulher;
