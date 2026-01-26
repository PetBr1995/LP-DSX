import HeroVendas from "../components/ComponentsVendas/HeroVendas";
import SecondSectionVendas from "../components/ComponentsVendas/SecondSectionVendas";
import CallToActionPatrocinadores from "../components/ComponentsPatrocinadores/CallToActionPatrocinadores";
import Footer from "../components/Footer";
import FormVendas from "../components/ComponentsVendas/FormVendas";
import ImpactoVendas from "../components/ComponentsVendas/ImpactoVendas";
import PassaporteVendas from "../components/ComponentsVendas/PassaporteVendas";
const Vendas = () => {
  return (
    <>
      <section className="overflow-x-hidden">
        <HeroVendas />
        <SecondSectionVendas />
        <ImpactoVendas />
        <PassaporteVendas />
        <CallToActionPatrocinadores />
        <FormVendas />
        <Footer />
      </section>
    </>
  );
};

export default Vendas;
