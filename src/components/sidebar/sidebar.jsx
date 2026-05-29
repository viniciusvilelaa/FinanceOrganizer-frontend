import { useNavigate, useLocation } from "react-router-dom";
import "./sidebar.css";
import { useAuth } from "../../context/apiContext";

export function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();
    const initialChar = user?.name ? user.name.charAt(0).toUpperCase() : "?";

    return (
        <div className="sidebar-container">
            <div className="sidebar-top">
                <div className="sidebar-logo-container flex items-center gap-3 mb-3">
                    <div className="sidebar-logo">
                        <p>{initialChar}</p>
                    </div>
                    <p className="text-lg font-medium text-blue-500">{user?.name || ""}</p>
                </div>

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
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors font-medium hover:cursor-pointer"
                        onClick={() => navigate('/transactionRegister')}>
                        Add Transaction
                    </button>
                </div>
            </div>

            <div className="sidebar-bottom">
                <p className="sidebar-logout" onClick={() => logout()}>
                    Logout
                </p>
            </div>
        </div>
    );
}
