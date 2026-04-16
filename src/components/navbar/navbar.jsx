import { useNavigate } from "react-router-dom";
import "../navbar/navbar.css";
import { Logout } from "../../utils/logout";

export function Navbar(){
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const initialChar = user?.name ? user.name.charAt(0).toUpperCase() : "?";

    return (
        <div className="navbar-container">
            <div className="navbar-left">
                <h2 className="navbar--title">Finance App</h2>
                <div className="navbar-container-links">
                    <p onClick={()=> navigate('/home')}>Dashboard</p>
                    <p onClick={()=> navigate('/transactions')}>Transactions</p>
                    <p>Analytics</p>
                </div>
            </div>

            <div className="navbar-right">
                <p>{initialChar}</p>
            </div>
        </div>
    );
}

