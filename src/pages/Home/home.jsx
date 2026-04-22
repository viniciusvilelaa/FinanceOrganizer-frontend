import { useAuth } from '../../context/apiContext';
import React from 'react';
import { useEffect, useState } from 'react';
import { useSummary } from '../../hooks/useSummary';
import { Navbar } from '../../components/navbar/navbar';
import BalanceCard from '../../components/balanceCard/balanceCard';
import RecentTransactions from '../../components/recentTransactions/recentTransactions';
import { useTransactions } from '../../hooks/useTransactions';
import MonthlyExpenseCard from '../../components/MonthlyExpenseCard/MonthlyExpenseCard';
import { useMonthlyBalance } from '../../hooks/useMonthlyBalance';
import { Sidebar } from '../../components/sidebar/sidebar';


export default function Home() {
    const { summary, loading } = useSummary();
    const { transactions, loading: loadingTransaction } = useTransactions();
    const {monthlyBalance, loading: loadingBalances} = useMonthlyBalance();

    if (loading || loadingBalances || loadingTransaction) return null

    return (
        <div className="flex flex-col h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Conteúdo */}
            <div className="grid grid-cols-12 flex-1">

                {/* ESQUERDA */}
                <aside className="col-span-3 bg-white">
                    <Sidebar/>
                </aside>

                {/* MEIO */}
                <main className="col-span-6  mt-15 p-6 bg-white">
                    <BalanceCard total={summary.totalBalance} />
                    <br></br>
                    <RecentTransactions transactions={transactions}/>
                </main>

                {/* DIREITA */}
                <section className="col-span-3 bg-white p-6 mt-15 flex flex-col gap-4 ">
                    <MonthlyExpenseCard totalBalance={monthlyBalance.totalMonthIncome} type={"INCOME"}/>
                    <MonthlyExpenseCard totalBalance={monthlyBalance.totalMonthExpense} type={"EXPENSE"}/>
                </section>

            </div>
        </div>


    );
}


