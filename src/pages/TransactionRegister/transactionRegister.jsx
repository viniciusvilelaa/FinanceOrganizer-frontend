import React from 'react';
import NewTransactionCard from '../../components/NewTransactionCard/NewTransactionCard';
import RecentTransactions from '../../components/recentTransactions/recentTransactions';
import { useTransactions } from '../../hooks/useTransactions';


export default function TransactionRegister() {
    const { transactions, loading: loadingTransaction } = useTransactions();

    if(loadingTransaction) return null

    return (
         <>
                    {/* MEIO (Ocupa 6 colunas relativas ao container de 9 colunas) */}
                    <main className="col-span-6 mt-10 ml-2 p-6 bg-white">
                        <div className='new-transaction-header mb-6 pl-3'>
                            <h1 className='text-4xl font-semibold text-slate-800 mb-1'>New Transaction</h1>
                            <p className='text-slate-500 text-sm'>Log your financial moves</p>
                        </div>
                        <NewTransactionCard />
                    </main>
        
                    {/* DIREITA (Ocupa 3 colunas relativas ao container de 9 colunas) */}
                    <section className="col-span-3 bg-white p-6 mt-[128px] flex flex-col gap-4">
                        <RecentTransactions transactions={transactions}></RecentTransactions>
                    </section>
                </>
    );
}

