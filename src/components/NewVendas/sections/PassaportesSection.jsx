import PassaporteVendasHomeTeste from "../../HomeTesteComponentes/PassaporteVendasHomeTeste";
import PassaportesMobileHomeTeste from "../../HomeTesteComponentes/PassaportesMobileHomeTeste";
import PassaporteGrupoHomeTeste from "../../HomeTesteComponentes/PassaporteGrupoHomeTeste";

const PassaportesSection = ({ isMobile, onBuyPassaporte }) => {
  return (
    <div
      id="passaportes"
      className="border-t border-[#101010] bg-[url(/ELEMENTOS-BANNER-2.png)] bg-cover bg-center bg-no-repeat"
    >
      {isMobile ? (
        <PassaportesMobileHomeTeste onBuyPassaporte={onBuyPassaporte} />
      ) : (
        <PassaporteVendasHomeTeste onBuyPassaporte={onBuyPassaporte} />
      )}
      <PassaporteGrupoHomeTeste onBuyPassaporte={onBuyPassaporte} />
    </div>
  );
};

export default PassaportesSection;
