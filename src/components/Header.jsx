import Nav from "./Nav";
import Nav2 from "./Nav2";
import logo from "../assets/logonr.svg"
import { useState } from "react";


function Header() {
  const [isNavOpaque, setIsNavOpaque] = useState(false);
  return(
      <div className="flex from-blue-200 to-blue-600 bg-gradient-to-tl">
        <div className="w-2/5 flex flex-col items-center justify-center">
        <img src={logo} alt="logo" className="w-36 h-36"/>
        <h1 className="text-4xl font-bold">Necochea Rent House</h1>
        <span className="font-bold">Alquileres Temporarios</span> 
      </div>
      <div className="w-3/5">
        <Nav isOpaque={isNavOpaque} />
        <button className="bg-black text-white px-4 py-2 rounded" onClick={() => setIsNavOpaque(!isNavOpaque)}>Que diseño choto, lo podes cambiar?</button>      
      </div>
  </div>
  )
}

export default Header;