import { useAuth } from '../../context/apiContext';
import React from 'react';
import { useEffect, useState } from 'react';
import { summaryHook } from '../../hooks/summaryHook';
import { Navbar } from '../../components/navbar/navbar';
import BalanceCard from '../../components/balanceCard/balanceCard';
import RecentTransactions from '../../components/recentTransactions/recentTransactions';
import { transactionsHook } from '../../hooks/transactionsHook';


export default function Home() {
    const { summary, loading } = summaryHook();
    const { transactions, loadingTransaction } = transactionsHook();

    if (loading) return <p>Carregando</p>
    if (loadingTransaction) return <p>Carregando</p>

    return (
        <div className="flex flex-col h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Conteúdo */}
            <div className="grid grid-cols-12 flex-1">

                {/* ESQUERDA */}
                <aside className="col-span-3 bg-gray-100 p-4">
                    Sidebar
                </aside>

                {/* MEIO */}
                <main className="col-span-6  mt-15 p-6 bg-white">
                    <BalanceCard total={summary.totalBalance} />
                    <br></br>
                    <RecentTransactions transactions={transactions}/>
                </main>

                {/* DIREITA */}
                <section className="col-span-3 bg-gray-100 p-4">

                </section>

            </div>
        </div>


    );
}


