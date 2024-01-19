import Nav from "./Nav";
import Nav2 from "./Nav2";
import logo from "../assets/logonr.svg"
import { useState } from "react";


function Header() {
  const [isNavOpaque, setIsNavOpaque] = useState(false);
  const [navVersion, setNavVersion] = useState(1);

  const toggleNavVersion = () => {
    setIsNavOpaque(true); // Oculta el Nav actual
    setTimeout(() => { // Espera a que la transición de opacidad termine
      setNavVersion(navVersion === 1 ? 2 : 1); // Cambia la versión del Nav
      setIsNavOpaque(false); // Muestra el nuevo Nav
    }, 500); // Ajusta este valor al tiempo de tu transición CSS
  };
  
  return(
      <div className="flex from-blue-200 to-blue-600 bg-gradient-to-tl">
        <div className="w-2/5 flex flex-col items-center justify-center">
        <img src={logo} alt="logo" className="w-36 h-36"/>
        <h1 className="text-4xl font-bold">Necochea Rent House</h1>
        <span className="font-bold">Alquileres Temporarios</span> 
      </div>
      <div className="w-3/5 flex flex-col items-end">
        {navVersion === 1 ? <Nav key="nav1" isOpaque={isNavOpaque} /> : <Nav2 key="nav2" isOpaque={isNavOpaque} />}
        <button className="bg-black text-white px-6 py-2 rounded mb-6" onClick={toggleNavVersion}>Que diseño choto, lo podes cambiar?</button>      
      </div>
  </div>
  )
}

export default Header;