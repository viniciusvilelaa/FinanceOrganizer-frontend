
import './App.css'
import { AppRoutes } from './routes/AppRoutes'
import { AuthProvider } from './context/apiContext'

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes/>
    </AuthProvider>
  )
  
}
