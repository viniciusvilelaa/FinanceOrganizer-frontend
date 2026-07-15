export function Logout(navigate){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    if (navigate) {
        navigate("/");
    }
}