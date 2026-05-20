import { useNavigate } from "react-router-dom";
import "../navbar/navbar.css";
import logoFinance from "../../assets/logoletra.png";
import logoSolo from "../../assets/logo-solo.png"

export function Navbar() {

    return (
        <div className="navbar-container flex justify-center">



            <img src={logoFinance} alt="finance logo" className="navbar-logo" />



        </div>
    );
}

