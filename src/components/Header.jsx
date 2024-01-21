import Nav from "./Nav";
import Nav2 from "./Nav2";
import logo from "../assets/logov2.svg"
import { useState } from "react";


function Header() {
  const [isNavOpaque, setIsNavOpaque] = useState(false);
  const [navVersion, setNavVersion] = useState(1);
  const [isLogoSpinning, setIsLogoSpinning] = useState(false);

  const toggleNavVersion = () => {
    setIsNavOpaque(true);
    setIsLogoSpinning(!isLogoSpinning);
    setTimeout(() => { 
      setNavVersion(navVersion === 1 ? 2 : 1); 
      setIsNavOpaque(false); 
    }, 500); 
    setTimeout(() => { // Detiene la animación de rotación después de 5 segundos
      setIsLogoSpinning(false);
    }, 5000);
  };
  
  return(
      <div className="flex from-blue-200 to-blue-600 bg-gradient-to-tl">
        <div className="w-2/5 flex flex-col items-center justify-center">
        <img src={logo} alt="logo" className={`w-72 h-72 ${isLogoSpinning ? 'spin' : ''}`}/>
      </div>
      <div className="w-3/5 flex flex-col items-end justify-end">
        {navVersion === 1 ? <Nav key="nav1" isOpaque={isNavOpaque} /> : <Nav2 key="nav2" isOpaque={isNavOpaque} />}
        <button className="bg-black text-white px-6 py-2 rounded mt-10" onClick={toggleNavVersion}>Que diseño choto, lo podes cambiar?</button>      
      </div>
  </div>
  )
}

export default Header;