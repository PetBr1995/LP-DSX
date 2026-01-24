import AmbientesPatrocinadores from "../components/ComponentsPatrocinadores/AmbientesPatrocinadores"
import BigNumberPatrocinadores from "../components/ComponentsPatrocinadores/BigNumberPatrocinadores"
import CallToActionPatrocinadores from "../components/ComponentsPatrocinadores/CallToActionPatrocinadores"
import FAQpatrocinadores from "../components/ComponentsPatrocinadores/FAQPatrocinadores"
import HeroPatrocinadores from "../components/ComponentsPatrocinadores/HeroPatrocinadores"
import LugarPatrocinadores from "../components/ComponentsPatrocinadores/LugarPatrocinadores"
import MarcasPatrocinadores from "../components/ComponentsPatrocinadores/MarcasPatrocinadores"
import NoticiasDSXPatrocinadores from "../components/ComponentsPatrocinadores/NoticiasDSXPatrocinadores"
import ReferenciasPatrocinadores from "../components/ComponentsPatrocinadores/ReferenciasPatrocinadores"
import VideoSectionPatrocinadores from "../components/ComponentsPatrocinadores/VideoSectionPatrocinadores"
import Footer from "../components/Footer"

const Patrocinadores = () => {
    return (
        <>
            <HeroPatrocinadores/>
            <BigNumberPatrocinadores/>
            <VideoSectionPatrocinadores/>
            <ReferenciasPatrocinadores/>
            <AmbientesPatrocinadores/>
            <LugarPatrocinadores/>
            <NoticiasDSXPatrocinadores/>
            <MarcasPatrocinadores/>
            <CallToActionPatrocinadores/>
            <FAQpatrocinadores/>
            <Footer/>
        </>
    )
}

export default Patrocinadores
