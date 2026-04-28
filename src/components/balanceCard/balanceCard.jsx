import '../balanceCard/balanceCard.css'
import { useNavigate } from 'react-router-dom';

export default function BalanceCard({total}) {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl p-[25px] text-left  w-full card-container">
      <h1 className="text-sm font-normal text-gray-400 mb-2 uppercase tracking-wider">Total Balance</h1>
      <p className={`text-3xl font-bold mb-5 card-balance ${total < 0 ? 'text-red-500' : ''}`}>
        R$ {total.toFixed(2).replace('.', ',')}
      </p>
      <div className="flex gap-3">
        <button onClick={() => navigate('/transactionRegister')} className="flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold cursor-pointer transition-opacity duration-200 hover:opacity-85 bg-[#3870EA] text-white">
          Add Income
        </button>
        <button onClick={() => navigate('/transactionRegister')} className="flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold cursor-pointer transition-opacity duration-200 hover:opacity-85 bg-white text-[#3870EA] border border-[#3870EA]">
          Add Expense
        </button>
      </div>
    </div>
  )
}
