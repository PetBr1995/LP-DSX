import { FormButton } from "../components/FormSection"
import HeroSection from "../components/HeroSection"
import HeroSectionV2 from "../components/HeroSectionV2"
import CTAButton from "../components/Mascaras/CTAButton"
import HeaderMask from "../components/Mascaras/HeaderMask"
import MainMask from "../components/Mascaras/MainMask"
import WhatsAppButton from "../components/Mascaras/WhatsAppButton"

const WhatsappPage = () => {
    return(
        <>
            <section>
                <HeroSection/>
                <HeroSectionV2/>
                <div className="py-8 flex justify-center">
                    <WhatsAppButton link="https://chat.whatsapp.com/B9hsyLb6Ksp979K4W8eh5S" backgroundColor="#000000" titulo="Entre para o grupo vip" textColor="#ffffff"/>
                </div>
            </section>
        </>
    )
}

export default WhatsappPage