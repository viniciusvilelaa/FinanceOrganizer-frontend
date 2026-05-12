
import './App.css'
import { AppRoutes } from './routes/AppRoutes'
import { AuthProvider } from './context/apiContext'
import { Toaster } from 'sonner'

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" richColors />
      <AppRoutes/>
    </AuthProvider>
  )
  
}
