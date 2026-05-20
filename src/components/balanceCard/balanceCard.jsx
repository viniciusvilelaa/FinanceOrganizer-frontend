import '../balanceCard/balanceCard.css'
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';

export default function BalanceCard({ total }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl p-[25px] text-left  w-full card-container">
      <h1 className="text-sm font-normal text-gray-400 mb-2 uppercase tracking-wider">Total Balance</h1>
      <p className={`text-3xl font-bold  card-balance text text-blue-500 ${total < 0 ? 'text-red-500' : ''}`}>
        {formatCurrency(total)}
      </p>
    </div>
  )
}
