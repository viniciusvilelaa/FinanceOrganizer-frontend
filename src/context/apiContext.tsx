import axios from 'axios'
import { createContext, useContext, useState, useEffect } from 'react'


const AuthContext = createContext(null);


//Criando instancia da API
export const api = axios.create({
    baseURL: "/api",
    withCredentials: true
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        async function loadUser() {
            try {
                const { data } = await api.get("/users/me");
                setUser(data.user);
            } catch (error) {
                setUser(null);
            } finally {
                setIsLoading(false)
            }
        }
        loadUser();
    }, []);

    useEffect(() => {
        const interceptor = api.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    setUser(null);
                }
                return Promise.reject(error);
            }
        );

        return () => api.interceptors.response.eject(interceptor);
    }, []);

    async function login(email, password) {
        try {
            const { data } = await api.post("/users/login", { email, password });
            setUser(data.user);

        } catch (err) {
            if (err.response?.status === 401) {
                throw new Error("Invalid credentials");
            }

            throw new Error("Error to acess server");

        }

    }

    async function register(name, email, password) {
        await api.post('/users', { name, email, password });
        await login(email, password);

    }

    async function logout() {
        try {
            await api.post("/users/logout");
        } finally {
            setUser(null);
        }

    }

    return (
        <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, logout, register }}>

            {children}
        </AuthContext.Provider>
    );

}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) throw new Error("useAuth deve ser usado dentro do AuthProvider");

    return context;
}