import PassaporteVendasHomeTeste from "../../HomeTesteComponentes/PassaporteVendasHomeTeste";
import PassaportesMobileHomeTeste from "../../HomeTesteComponentes/PassaportesMobileHomeTeste";
import PassaporteGrupoHomeTeste from "../../HomeTesteComponentes/PassaporteGrupoHomeTeste";

const PassaportesSection = ({
  isMobile,
  onBuyPassaporte,
  hidePassaporteButtons = false,
  showOshiroDiscount = false,
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
      <PassaporteGrupoHomeTeste
        onBuyPassaporte={onBuyPassaporte}
        hideBuyButton={hidePassaporteButtons}
        showOshiroDiscount={showOshiroDiscount}
      />
    </div>
  );
};

export default PassaportesSection;
