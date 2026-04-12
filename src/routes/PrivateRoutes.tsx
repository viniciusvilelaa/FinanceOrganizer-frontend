import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/apiContext';

export function PrivateRoutes({ children }: { children: React.ReactNode }) {
    const {isAuthenticated, loading} = useAuth();

    if(loading) return <div>Carregando...</div>;

    if(!isAuthenticated) return <Navigate to="/login" replace/>
    
    return children;
}