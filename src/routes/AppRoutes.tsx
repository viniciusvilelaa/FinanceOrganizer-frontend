import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "../pages/Login/login"
import Register from '../pages/Register/register'
import Home from '../pages/Home/home'
import History from '../pages/TransactionHistory/transactionHistory'
import TransactionRegister from '../pages/TransactionRegister/transactionRegister'
import { PrivateRoutes } from './PrivateRoutes.js';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        <Route path="/home" element={<PrivateRoutes><Home/></PrivateRoutes>} />
        <Route path="/history" element={<PrivateRoutes><History/></PrivateRoutes>} />
        <Route path="/transactionRegister" element={<PrivateRoutes><TransactionRegister/></PrivateRoutes>}/>
      </Routes>
    </BrowserRouter>
  );
}