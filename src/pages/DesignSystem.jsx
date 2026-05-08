import "../design-system/design-system.css";
import { DSBadge, DSButton, DSCard, DSSectionTitle } from "../design-system";

const DesignSystem = () => {
  return (
    <main className="ds-page">
      <div className="ds-container">
        <DSSectionTitle>DSX Design System (Base)</DSSectionTitle>

        <div className="ds-grid">
          <DSCard title="Cores" description="Paleta principal do projeto">
            <div className="ds-row" style={{ marginTop: "1rem" }}>
              <DSBadge tone="brand">Brand</DSBadge>
              <DSBadge tone="success">Success</DSBadge>
              <DSBadge tone="danger">Danger</DSBadge>
            </div>
          </DSCard>

          <DSCard title="Botões" description="Estados e variações base">
            <div className="ds-row" style={{ marginTop: "1rem" }}>
              <DSButton variant="primary">Primário</DSButton>
              <DSButton variant="secondary">Secundário</DSButton>
              <DSButton variant="ghost">Ghost</DSButton>
            </div>
          </DSCard>

          <DSCard
            title="Tipografia"
            description="Display: Anton/Bebas | Body: Bai Jamjuree/Roboto"
          >
            <p style={{ marginTop: "1rem", marginBottom: 0 }}>
              Use títulos em caixa alta para blocos de destaque e corpo em leitura limpa.
            </p>
          </DSCard>
        </div>
      </div>
    </main>
  );
};

export default DesignSystem;
