import { useNavigate, useLocation } from "react-router-dom";
import "./sidebar.css";
import { Logout } from "../../utils/logout";

export function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="sidebar-container">
            <div className="sidebar-top">
                <h2 className="sidebar-title">Finance App</h2>
                <div className="sidebar-links">
                    <p 
                        className={location.pathname === '/home' ? 'active' : ''} 
                        onClick={() => navigate('/home')}
                    >
                        Dashboard
                    </p>
                    <p 
                        className={location.pathname === '/transactions' ? 'active' : ''} 
                        onClick={() => navigate('/transactions')}
                    >
                        Transactions
                    </p>
                    <p 
                        className={location.pathname === '/settings' ? 'active' : ''} 
                        onClick={() => navigate('/settings')}
                    >
                        Settings
                    </p>
                </div>
            </div>
            
            <div className="sidebar-bottom">
                <p className="sidebar-logout" onClick={() => Logout(navigate)}>
                    Logout
                </p>
            </div>
        </div>
    );
}
