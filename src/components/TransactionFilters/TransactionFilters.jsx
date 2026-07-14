import './transactionFilters.css'

export default function TransactionFilters({ filters, onFilterChange, onExport, isExporting }) {
  return (
    <div className="filters-container">

      <input
        className="filter-input"
        type="text"
        placeholder="Search by description"
        value={filters.description}
        onChange={(e) => onFilterChange('description', e.target.value)}
      />

      <select
        className="filter-input"
        value={filters.category}
        onChange={(e) => onFilterChange('category', e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="COMIDA">Food</option>
        <option value="TRANSPORTE">Transport</option>
        <option value="LAZER">Leisure</option>
        <option value="SAUDE">Health</option>
        <option value="EDUCACAO">Education</option>
        <option value="MORADIA">Housing</option>
        <option value="OUTROS">Others</option>
        <option value="INVESTIMENTO">Investment</option>
        <option value="SALARIO">Salary</option>
        <option value="ASSINATURA">Subscription</option>
        <option value="COMBUSTIVEL">Fuel</option>
      </select>

      <select
        className="filter-input"
        value={filters.type}
        onChange={(e) => onFilterChange('type', e.target.value)}
      >
        <option value="">All Types</option>
        <option value="INCOME">Income</option>
        <option value="EXPENSE">Expense</option>
      </select>

      <div className="filter-period">
        {['30d', '3m', '1y'].map((p) => (
          <button
            key={p}
            className={`period-btn ${filters.period === p ? 'period-active' : ''}`}
            onClick={() => onFilterChange('period', filters.period === p ? '' : p)}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="text-right">
        <button disabled={isExporting} onClick={onExport} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
          {isExporting ? "Exporting..." : "Export PDF"}
        </button>
      </div>
    </div>
  )
}