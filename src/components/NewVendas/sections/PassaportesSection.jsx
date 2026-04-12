import PassaporteVendasHomeTeste from "../../HomeTesteComponentes/PassaporteVendasHomeTeste";
import PassaportesMobileHomeTeste from "../../HomeTesteComponentes/PassaportesMobileHomeTeste";
import PassaporteGrupoHomeTeste from "../../HomeTesteComponentes/PassaporteGrupoHomeTeste";

const PassaportesSection = ({ isMobile, onBuyPassaporte }) => {
  return (
    <div
      id="passaportes"
      className="bg-black"
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
