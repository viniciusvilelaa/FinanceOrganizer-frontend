import { useNavigate } from "react-router-dom";
import "../navbar/navbar.css";
import logoFinance from "../../assets/logoletra.png";
import logoSolo from "../../assets/logo-solo.png"

export function Navbar(){
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const initialChar = user?.name ? user.name.charAt(0).toUpperCase() : "?";

    return (
        <div className="navbar-container">
            <div className="navbar-left">
                <img src={logoSolo} alt="finance logo" className="navbar-logo solo" />
            </div>

            <div className="navbar-middle">
                <img src={logoFinance} alt="finance logo" className="navbar-logo" />
            </div>

            <div className="navbar-right">
                <p>{initialChar}</p>
            </div>
        </div>
    );
}

