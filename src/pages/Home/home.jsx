import { useAuth } from '../../context/apiContext';
import React from 'react';
import { useEffect, useState } from 'react';
import { summaryHook } from '../../hooks/summaryHook';


export default function Home() {
    const {summary, loading} = summaryHook();

    if(loading) return <p>Carregando</p>


    return (
        <div>
            <h1>Finance App - Home</h1>
            <p>Saldo total: {summary.totalBalance}</p>
            <p>Saldo receitas: {summary.totalIncome}</p>
            <p>Saldo despesas: {summary.totalExpense}</p>
        </div>
        

    );
}

