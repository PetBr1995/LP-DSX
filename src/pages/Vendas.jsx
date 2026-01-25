import HeroVendas from "../components/ComponentsVendas/HeroVendas";
import SecondSectionVendas from "../components/ComponentsVendas/SecondSectionVendas";

const Vendas = () => {
  return (
    <>
      <section className="overflow-x-hidden">
        <HeroVendas />
        <SecondSectionVendas />
      </section>
    </>
  );
};

export default Vendas;
