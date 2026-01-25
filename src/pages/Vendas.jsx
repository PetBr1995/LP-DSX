import HeroVendas from "../components/ComponentsVendas/HeroVendas";
import SecondSectionVendas from "../components/ComponentsVendas/SecondSectionVendas";
import CallToActionPatrocinadores from "../components/ComponentsPatrocinadores/CallToActionPatrocinadores";
const Vendas = () => {
  return (
    <>
      <section className="overflow-x-hidden">
        <HeroVendas />
        <SecondSectionVendas />
        <CallToActionPatrocinadores />
      </section>
    </>
  );
};

export default Vendas;
