import PassaporteVendasHomeTeste from "../../HomeTesteComponentes/PassaporteVendasHomeTeste";
import PassaportesMobileHomeTeste from "../../HomeTesteComponentes/PassaportesMobileHomeTeste";
import PassaporteGrupoHomeTeste from "../../HomeTesteComponentes/PassaporteGrupoHomeTeste";

const PassaportesSection = ({
  isMobile,
  onBuyPassaporte,
  hidePassaporteButtons = false,
  showOshiroDiscount = false,
  hideGroupPassaporte = false,
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
          showOshiroDiscount={showOshiroDiscount}
        />
      ) : (
        <PassaporteVendasHomeTeste
          onBuyPassaporte={onBuyPassaporte}
          hideBuyButton={hidePassaporteButtons}
          showOshiroDiscount={showOshiroDiscount}
        />
      )}
      {!hideGroupPassaporte ? (
        <PassaporteGrupoHomeTeste
          onBuyPassaporte={onBuyPassaporte}
          hideBuyButton={hidePassaporteButtons}
          showOshiroDiscount={showOshiroDiscount}
        />
      ) : null}
    </div>
  );
};

export default PassaportesSection;
