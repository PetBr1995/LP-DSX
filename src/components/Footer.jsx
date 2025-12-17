const Footer = () => {
    return (
        <footer 
            className="
                relative
                py-2
                bg-no-repeat 
                bg-bottom-right 
                bg-[url('/Ellipse-background.png')]
                bg-[#111111]
                bg-size-[240px]    /* controla o tamanho da elipse */
                md:bg-size-[320px]  /* maior no desktop */
            "
        >
            <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

                <img
                    src="/logo-dsx-horizontal.svg"
                    alt="Vem aí DSX"
                    className="w-[150px]"
                />
                <div className="font-jamjuree text-center">
                    <p className="text-white">10.279.661/0001-51</p>
                    <p className="text-white">© 2025 Digital Comunicação.</p>
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
