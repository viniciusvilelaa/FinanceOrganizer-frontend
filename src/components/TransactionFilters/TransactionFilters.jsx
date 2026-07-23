import { useCategories } from '../../hooks/categories/useCategories'
import './transactionFilters.css'

export default function TransactionFilters({ filters, onFilterChange, onExport, isExporting }) {

  const {data: categories, isLoading: isLoadingCategories} = useCategories();

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
        value={filters.categoryId}
        onChange={(e) => onFilterChange('categoryId', e.target.value)}
        disabled={isLoadingCategories}
      >
        <option value="">All Categories</option>
        {categories?.map((cat) => (
         <option key={cat.id} value={cat.id}>
          {cat.name}
         </option>
        ))}
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