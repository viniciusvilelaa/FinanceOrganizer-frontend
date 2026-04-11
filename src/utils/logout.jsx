import { Navigate } from "react-router-dom";

export function Logout(){
    const navigate = useNavigate();
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
}