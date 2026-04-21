import { useAuth } from '../../context/apiContext';
import React from 'react';
import { useEffect, useState } from 'react';
import { summaryHook } from '../../hooks/useSummary';
import { Navbar } from '../../components/navbar/navbar';
import BalanceCard from '../../components/balanceCard/balanceCard';
import RecentTransactions from '../../components/recentTransactions/recentTransactions';
import { transactionsHook } from '../../hooks/useTransactions';
import MonthlyExpenseCard from '../../components/MonthlyExpenseCard/MonthlyExpenseCard';
import { monthlyBalanceHook } from '../../hooks/useMonthlyBalance';


export default function Home() {
    const { summary, loading } = summaryHook();
    const { transactions, loadingTransaction } = transactionsHook();
    const {monthlyBalance, loadingBalances} = monthlyBalanceHook();

    if (loading) return null
    if(loadingBalances) return null

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
                <section className="col-span-3 bg-white p-6 ">
                    <MonthlyExpenseCard totalExpense={monthlyBalance.totalMonthExpense}/>
                </section>

            </div>
        </div>


    );
}


