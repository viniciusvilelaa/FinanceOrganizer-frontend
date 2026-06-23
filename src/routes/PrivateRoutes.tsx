import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/apiContext';
import { Navbar } from '../components/navbar/navbar';
import { Sidebar } from '../components/sidebar/sidebar';
import { useEffect } from 'react';

export function PrivateRoutes({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();



    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate("/", { replace: true });
        }
    }, [isLoading, isAuthenticated])

    if (isLoading) return <div>Carregando...</div>;

    if (!isAuthenticated) return <Navigate to="/" replace />


    return (
        <div className="flex flex-col h-screen overflow-hidden">

            <Navbar />


            <div className="grid grid-cols-12 flex-1 overflow-hidden">
                <aside className="col-span-3 bg-white h-full">
                    <Sidebar />
                </aside>

                <div className="col-span-9 grid grid-cols-9 overflow-y-auto h-full">
                    {children}
                </div>
            </div>
        </div>
    );
}
