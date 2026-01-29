const Footer = () => {
    return (
      <footer
        className="
          relative
          py-6
          bg-black
  
          after:content-none
  
          md:after:content-['']
          md:after:block
          md:after:absolute
          md:after:bottom-0
          md:after:right-0
          md:after:z-0
          md:after:w-[100px]
          md:after:h-[100px]
          md:after:bg-[url('/vector-20.svg')]
          md:after:bg-no-repeat
          md:after:bg-contain
          md:after:bg-top
          md:after:pointer-events-none
        "
      >
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <img
            src="/logo-dsx-horizontal.svg"
            alt="Vem aí DSX"
            className="w-[150px]"
          />
  
          <div className="font-jamjuree text-center text-sm leading-relaxed">
            <p className="text-white">10.279.661/0001-51</p>
            <p className="text-white">© 2026 Digital Comunicação.</p>
            <p className="text-white">Todos os direitos reservados.</p>
          </div>
  
          <img
            src="/powered-digital-hub.png"
            alt="Powered by Digital Hub"
            className="w-[270px]"
          />
        </div>
      </footer>
    );
  };
  
  export default Footer;
  