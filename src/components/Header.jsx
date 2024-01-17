import Nav from "./Nav";
import logo from "../assets/logonr.svg"
import { AuthProvider } from "../config/AuthContext";

function Header() {
    return(
        <div className="flex from-blue-200 to-blue-600 bg-gradient-to-tl">
        <div className="w-2/5 flex flex-col items-center justify-center">
            <img src={logo} alt="logo" className="w-36 h-36"/>
            <h1 className="text-4xl font-bold">Necochea Rent House</h1>
            <span className="font-bold">Alquileres Temporarios</span> 
        </div>
        <div className="w-3/5">
            <Nav/>
        </div>
    </div>
    )
}

export default Header;