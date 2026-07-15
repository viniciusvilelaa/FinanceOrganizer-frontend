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
import CurrentGoalCard from '../../components/Goals/CurrentGoalCard';
import { useCurrentGoal } from '../../hooks/useCurrentGoal';
import EmptyGoalCard from '../../components/Goals/EmptyGoalCard';
import BaseModalCard from '../../components/ModalFather/BaseModalCard';
import { useState } from 'react';
import { GoalForm } from '../../components/Goals/GoalForm';



export default function Home() {
    const { data: summary, isFetching: isSummaryFetching } = useSummary();
    const { transactions, isFetching: isTransactionsFetching } = useTransactions();
    const { data: monthlyBalance, isFetching: isMonthlyBalanceFetching } = useMonthlyBalance();
    const { dataPieChart, isFetching: isPieChartFetching } = useCategoryChart()
    const { dataMonthChart, isFetching: isSixMonthChartFetching } = useSixMonthChart();
    const { currentGoalData, isFetching: isCurrentGoalFetching, isEmpty: isCurrentGoalEmpty } = useCurrentGoal();
    const [isModalOpen, setModalOpen] = useState(false);

  

    return (
        <>
            {/* MEIO (Ocupa 6 colunas relativas ao container de 9 colunas) */}
            <main className="col-span-6 ml-2 p-6 bg-white">
                <BalanceCard total={summary?.totalBalance} isFetching={isSummaryFetching} />
                <br></br>
                
                {isCurrentGoalFetching ? (<CurrentGoalCard isFetching={true} />) :
                    isCurrentGoalEmpty ? (<EmptyGoalCard onCreateGoal={() => setModalOpen(true)}/>) :
                        (<CurrentGoalCard
                            name={currentGoalData.name}
                            targetAmount={currentGoalData.targetAmount}
                            currentAmount={currentGoalData.currentAmount}
                            status={currentGoalData.status}
                            percentage={currentGoalData.percentage}
                            month={currentGoalData.month}
                            year={currentGoalData.year} />)}
                <BaseModalCard size='2xl' onClose={()=> setModalOpen(false)}title={"New goal"}isOpen={isModalOpen}><GoalForm onSuccess={()=>setModalOpen(false)}></GoalForm></BaseModalCard>
                <br></br>
                <CategoryPieChart data={dataPieChart} isFetching={isPieChartFetching}></CategoryPieChart>
                <br></br>
                <MonthBarChart data={dataMonthChart} isFetching={isSixMonthChartFetching}></MonthBarChart>
            </main>

            {/* DIREITA (Ocupa 3 colunas relativas ao container de 9 colunas) */}
            <section className="col-span-3 bg-white p-6 flex flex-col gap-4">
                <MonthlyExpenseCard totalBalance={monthlyBalance?.totalMonthIncome} type={"INCOME"} isFetching={isMonthlyBalanceFetching} />
                <MonthlyExpenseCard totalBalance={monthlyBalance?.totalMonthExpense} type={"EXPENSE"} isFetching={isMonthlyBalanceFetching} />
                <RecentTransactions transactions={transactions} isFetching={isTransactionsFetching} />
            </section>
        </>
    );
}
