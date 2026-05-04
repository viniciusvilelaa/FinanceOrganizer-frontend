import "../HistoryTransactionCard/HistoryTransactionCard.css"
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useTransactions } from "../../hooks/useTransactions";
import TransactionFilters from "../TransactionFilters/TransactionFilters";
import { formatDate } from "../../utils/formatDate";

export default function HistoryTransactionCard() {

    const [filters, setFilters] = useState({
        description: '',
        type: '',
        category: '',
        period: ''
    });

    const [debouncedDescription] = useDebounce(filters.description, 500);

    const { transactions, loading } = useTransactions({
        ...filters,
        description: debouncedDescription
    });

    function handleFilterChange(key, value) {
        setFilters(prev => ({ ...prev, [key]: value }))
    }

    return (
        <div className="bg-white rounded-xl mt-6">
            <TransactionFilters filters={filters} onFilterChange={handleFilterChange}></TransactionFilters>
            
            <div className="pt-4">
                {loading && (
                    <div className="flex justify-center items-center py-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
                        <p className="text-gray-500">Loading transactions...</p>
                    </div>
                )}

                {!loading && transactions.length === 0 && (
                    <div className="flex justify-center items-center py-10">
                        <p className="text-gray-500">No transactions found for the selected filters.</p>
                    </div>
                )}

                {!loading && transactions.length > 0 && (
                    <div className="flex flex-col gap-3">
                        {transactions.map(t => (
                            <div key={t.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-sm transition-shadow bg-gray-50/50">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${t.type === 'INCOME' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                        {t.type === 'INCOME' ? '+' : '-'}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">{t.description}</p>
                                        <div className="flex gap-2 text-sm text-gray-500 mt-1">
                                            <span>{formatDate(t.date)}</span>
                                            <span>•</span>
                                            <span className="capitalize">{t.category?.toLowerCase() || 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={`font-semibold text-lg ${t.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}`}>
                                    {t.type === 'INCOME' ? '+' : '-'} R$ {Math.abs(t.amount).toFixed(2).replace('.', ',')}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}