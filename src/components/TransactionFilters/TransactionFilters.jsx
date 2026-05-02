import './transactionFilters.css'

export default function TransactionFilters({ filters, onFilterChange }) {
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
        <option value="LAZER">Lazer</option>
        <option value="COMIDA">Comida</option>
        <option value="TRANSPORTE">Transporte</option>
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

    </div>
  )
}