export function Logout(navigate){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("func logout");
    if (navigate) {
        navigate("/");
    }
}