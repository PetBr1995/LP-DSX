const SlideFaixa = () => {
    return (
      <div className="faixa-wrapper">
        <div className="faixa-track">
          {/* Duplicamos a faixa para fazer o loop contínuo */}
          <img
            src="/faixa-dsx-slide.png"
            alt="faixa"
            className="block w-full h-auto"
          />
          <img
            src="/faixa-dsx-slide.png"
            alt="faixa clone"
            className="block w-full h-auto"
          />
        </div>
      </div>
    );
  };
  
  export default SlideFaixa;
  