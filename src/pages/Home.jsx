import ContentSection from "../components/ContentSection";
import DsxConsolidation from "../components/DscConsolidation";
import FaleConosco from "../components/FaleConosco";
import Footer from "../components/Footer";
import FormSection from "../components/FormSection";
import HeroSection from "../components/HeroSection";
import SecondSection from "../components/SecondSection";
import SlideFaixa from "../components/SlideFaixa";
import SlidePalestrantes from "../components/SlidePalestrantes";

const Home = () => {
    return (
        <>
            <section className="bg-black">
                <HeroSection />
                <SlideFaixa />
                <SecondSection />
                <SlidePalestrantes />
                <DsxConsolidation />
                <ContentSection />
                <FormSection />
                <FaleConosco />
                <Footer />
            </section>
        </>
    );
}

export default Home;
