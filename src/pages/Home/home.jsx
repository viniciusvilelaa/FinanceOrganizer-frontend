import { useSummary } from '../../hooks/useSummary';
import BalanceCard from '../../components/balanceCard/balanceCard';
import RecentTransactions from '../../components/recentTransactions/recentTransactions';
import { useTransactions } from '../../hooks/useTransactions';
import MonthlyExpenseCard from '../../components/MonthlyExpenseCard/MonthlyExpenseCard';
import { useMonthlyBalance } from '../../hooks/useMonthlyBalance';

export default function Home() {
    const { summary, loading } = useSummary();
    const { transactions, loading: loadingTransaction } = useTransactions();
    const { monthlyBalance, loading: loadingBalances } = useMonthlyBalance();
    if (!summary || !monthlyBalance) return null

    if (loading || loadingBalances || loadingTransaction) return null

    return (
        <>
            {/* MEIO (Ocupa 6 colunas relativas ao container de 9 colunas) */}
            <main className="col-span-6 mt-15 ml-2 p-6 bg-white">
                <BalanceCard total={summary.totalBalance} />
                <br></br>
                
            </main>

            {/* DIREITA (Ocupa 3 colunas relativas ao container de 9 colunas) */}
            <section className="col-span-3 bg-white p-6 mt-15 flex flex-col gap-4">
                <MonthlyExpenseCard totalBalance={monthlyBalance.totalMonthIncome} type={"INCOME"} />
                <MonthlyExpenseCard totalBalance={monthlyBalance.totalMonthExpense} type={"EXPENSE"} />
                <RecentTransactions transactions={transactions} />
            </section>
        </>
    );
}
