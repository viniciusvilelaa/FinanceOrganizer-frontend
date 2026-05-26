import { useSummary } from '../../hooks/useSummary';
import BalanceCard from '../../components/balanceCard/balanceCard';
import RecentTransactions from '../../components/recentTransactions/recentTransactions';
import { useTransactions } from '../../hooks/useTransactions';
import MonthlyExpenseCard from '../../components/MonthlyExpenseCard/MonthlyExpenseCard';
import { useMonthlyBalance } from '../../hooks/useMonthlyBalance';
import CategoryPieChart from '../../components/CategoryPieChart/CategoryPieChart';
import { useCategoryChart } from '../../hooks/useCategoryChart';
import MonthBarChart from '../../components/MonthBarChart/MonthBarChar';
import { useSixMonthChart } from '../../hooks/useSixMonthChart';

export default function Home() {
    const { data: summary, isFetching: isSummaryFetching } = useSummary();
    const { transactions, isFetching: isTransactionsFetching } = useTransactions();
    const { monthlyBalance, loading: loadingBalances } = useMonthlyBalance();
    const { dataEnchanced, loading: loadingPieChart } = useCategoryChart()
    const { dataMonthChart, loading: loadingBarChart } = useSixMonthChart();

    if (!summary || !monthlyBalance) return null

    if (loadingBalances || isTransactionsFetching || isSummaryFetching || loadingPieChart || loadingBarChart) return null

    return (
        <>
            {/* MEIO (Ocupa 6 colunas relativas ao container de 9 colunas) */}
            <main className="col-span-6 ml-2 p-6 bg-white">
                <BalanceCard total={summary.totalBalance} />
                <br></br>
                <CategoryPieChart data={dataEnchanced}></CategoryPieChart>
                <br></br>
                <MonthBarChart data={dataMonthChart}></MonthBarChart>
            </main>

            {/* DIREITA (Ocupa 3 colunas relativas ao container de 9 colunas) */}
            <section className="col-span-3 bg-white p-6 flex flex-col gap-4">
                <MonthlyExpenseCard totalBalance={monthlyBalance.totalMonthIncome} type={"INCOME"} />
                <MonthlyExpenseCard totalBalance={monthlyBalance.totalMonthExpense} type={"EXPENSE"} />
                <RecentTransactions transactions={transactions} />
            </section>
        </>
    );
}
