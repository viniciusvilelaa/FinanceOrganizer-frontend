import axios from 'axios'
import { createContext, useContext, useState, useEffect } from 'react'


const AuthContext = createContext(null);


//Criando instancia da API
export const api = axios.create({
    baseURL: "http://localhost:3000/api"
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
            api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        const interceptor = api.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status == 401) {
                    logout();
                }
                return Promise.reject(error);
            }
        )

        return api.interceptors.response.eject(interceptor);
    }, []);

    async function login(email, password) {
        try {
            const { data } = await api.post("/users/login", { email, password });

            setToken(data.token);
            setUser(data.user);
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
        } catch(err) {
            if(err.response?.status === 401){
                throw new Error("Invalid credentials");
            }
            
            throw new Error("Error to acess server");

        }
        



    }

    async function register(name, email, password) {
        await api.post('/users', { name, email, password });
        await login(email, password);

    }

    function logout() {
        setToken(null);
        setUser(null);
        delete api.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
    }

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, loading, login, logout, register }}>

            {children}
        </AuthContext.Provider>
    );

}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) throw new Error("useAuth deve ser usado dentro do AuthProvider");

    return context;
}