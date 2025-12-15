import imgFundo from "../assets/vemai-dsx.png";

const Header = () => {
  return (
    <div
      className="
        fixed 
        -top-2.5
        sm:top-0 
        left-1/2 
        sm:left-1/2 
        sm:-translate-x-1/2 
        translate-x-[-260px]    

        z-1000
        max-w-[700px] 
        w-full
        sm:w-[90%]
        m-2 
        rounded-none
        sm:rounded-[50px]
        bg-black 
        text-center
        overflow-hidden

        before:content-['']
        before:absolute
        before:inset-0
        before:bg-[url('/elipse-1.png')]
        before:bg-no-repeat
        before:bg-center
        before:bg-contain
        before:opacity-80
        before:h-[170px]
        before:-top-15
        before:right-120
        before:z-0

        flex
        flex-col
        sm:flex-row
        justify-center
        items-center
        gap-2 sm:gap-4
        h-auto sm:h-20
        py-2 sm:py-0
      "
    >
      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center gap-2 py-2 sm:py-3">
        <img
          src={imgFundo}
          alt="img"
          className="w-56 sm:w-80 translate-x-0 sm:translate-x-14"
        />
      </div>
    </div>
  );
};

export default Header;
