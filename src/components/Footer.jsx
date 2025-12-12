const Footer = () => {
    return (
        <footer 
            className="
                relative 
                py-6
                bg-no-repeat 
                bg-bottom-right 
                bg-[url('/Ellipse-background.png')]
                bg-size-[240px]    /* controla o tamanho da elipse */
                md:bg-size-[320px]  /* maior no desktop */
            "
        >
            <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

                <img
                    src="/vemai-dsx.png"
                    alt="Vem aí DSX"
                    className="w-[50%] md:w-[40%]"
                />

                <img
                    src="/powered-digital-hub.png"
                    alt="Powered by Digital Hub"
                    className="w-[50%] md:w-[40%]"
                />

            </div>
        </footer>
    );
};

export default Footer;
