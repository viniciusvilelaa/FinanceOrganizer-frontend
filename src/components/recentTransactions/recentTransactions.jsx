import { useNavigate } from 'react-router-dom'
import './recentTransactions.css'
import { formatDate } from '../../utils/formatDate';
import { formatCurrency } from '../../utils/formatCurrency';
import RecentTransactionsSkeleton from './RecentTransactionsSkeleton';

export default function RecentTransactions({ transactions = [], isFetching }) {
  if (isFetching) return <RecentTransactionsSkeleton />;

  const navigate = useNavigate()
  const recent = transactions ? transactions.slice(0, 5) : [];

  return (
    <div className="bg-white rounded-xl p-[25px] w-full card-container">
      <div className="recent-header">
        <h1 className="text-sm font-normal text-gray-400 uppercase tracking-wider">
          Recent Transactions
        </h1>
        <span className="see-all" onClick={() => navigate('/transactions')}>
          See All
        </span>
      </div>

      <div className="recent-list">
        {recent.length === 0 && (
          <p className="recent-empty">No transactions yet.</p>
        )}
        {recent.map((t) => (
          <div key={t.id} className="recent-item">
            <div className="recent-icon" data-type={t.type}>
              {t.type === 'INCOME' ? '+' : '-'}
            </div>
            <div className="recent-info">
              <p className="recent-name">{t.description}</p>
              <p className="recent-date">{formatDate(t.date)}</p>
            </div>
            <p className={`recent-amount ${t.type === 'INCOME' ? 'income' : 'expense'}`}>
              {t.type === 'INCOME' ? '+' : '-'} {formatCurrency(t.amount)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}