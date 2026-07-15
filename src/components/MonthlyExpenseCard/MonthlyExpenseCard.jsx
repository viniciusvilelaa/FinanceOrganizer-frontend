import './monthlyExpenseCard.css'
import { formatCurrency } from '../../utils/formatCurrency'
import MonthlyExpenseCardSkeleton from './MonthlyExpenseCardSkeleton'

export default function MonthlyExpenseCard({ totalBalance, type, isFetching }) {
  if (isFetching) return <MonthlyExpenseCardSkeleton />

  const isIncome = type === 'INCOME'

  return (
    <div className="bg-white rounded-xl p-[25px] text-left w-full card-container expense-card-container mt-0">
      <h1 className="text-sm font-normal text-gray-400 uppercase tracking-wider mb-2">
        {isIncome ? 'Monthly Income' : 'Monthly Expense'}
      </h1>
      <div className="expense-row">
        <p className={`expense-value ${isIncome ? 'income-value' : 'expense-value-color'}`}>
          {formatCurrency(totalBalance)}
        </p>
        <div className={`expense-badge ${isIncome ? 'income-badge' : 'expense-badge-color'}`}>
          <span className="expense-arrow">{isIncome ? '↑' : '↓'}</span>
          <span className="expense-label">{isIncome ? 'Income' : 'Expense'}</span>
        </div>
      </div>
    </div>
  )
}