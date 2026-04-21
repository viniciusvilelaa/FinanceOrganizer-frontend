import '../monthlyExpenseCard/monthlyExpenseCard.css'

export default function MonthlyExpenseCard({ totalExpense, type }) {

  const titles ={
    INCOME: "Monthly Income",
    EXPENSE: "Monthly Expense"
  }

  return (
    <div className="bg-white rounded-xl p-[25px] text-left w-full card-container expense-card-container">
      <h1 className="text-sm font-normal text-gray-400 uppercase tracking-wider mb-2">
        Monthly Expense
      </h1>
      <div className="expense-row">
        <p className="expense-value">
          R$ {totalExpense.toFixed(2).replace('.', ',')}
        </p>
        <div className="expense-badge">
          <span className="expense-arrow">↓</span>
          <span className="expense-label">Expense</span>
        </div>
      </div>
    </div>
  )
}