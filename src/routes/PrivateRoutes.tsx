import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/apiContext';
import { Navbar } from '../components/navbar/navbar';
import { Sidebar } from '../components/sidebar/sidebar';

export function PrivateRoutes({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div>Carregando...</div>;

    if (!isAuthenticated) return <Navigate to="/" replace />

    return (
        <div className="flex flex-col h-screen">

            <Navbar />


            <div className="grid grid-cols-12 flex-1">
                <aside className="col-span-3 bg-white">
                    <Sidebar />
                </aside>

                <div className="col-span-9 grid grid-cols-9">
                    {children}
                </div>
            </div>
        </div>
    );
}
