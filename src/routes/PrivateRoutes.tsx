import { Navigate } from 'react-router-dom';

export function PrivateRoutes({ children }: { children: React.ReactNode }) {
    const isAuthenticated = localStorage.getItem('token');
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }
    return children;
}