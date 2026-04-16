import PassaporteVendasHomeTeste from "../../HomeTesteComponentes/PassaporteVendasHomeTeste";
import PassaportesMobileHomeTeste from "../../HomeTesteComponentes/PassaportesMobileHomeTeste";
import PassaporteGrupoHomeTeste from "../../HomeTesteComponentes/PassaporteGrupoHomeTeste";

const PassaportesSection = ({
  isMobile,
  onBuyPassaporte,
  hidePassaporteButtons = false,
}) => {
  return (
    <div
      id="passaportes"
      className="bg-black"
    >
      {isMobile ? (
        <PassaportesMobileHomeTeste
          onBuyPassaporte={onBuyPassaporte}
          hideBuyButton={hidePassaporteButtons}
        />
      ) : (
        <PassaporteVendasHomeTeste
          onBuyPassaporte={onBuyPassaporte}
          hideBuyButton={hidePassaporteButtons}
        />
      )}
      <PassaporteGrupoHomeTeste
        onBuyPassaporte={onBuyPassaporte}
        hideBuyButton={hidePassaporteButtons}
      />
    </div>
  );
};

export default PassaportesSection;
