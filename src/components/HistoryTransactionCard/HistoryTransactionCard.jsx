import "../HistoryTransactionCard/HistoryTransactionCard.css"
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useTransactions } from "../../hooks/useTransactions";
import TransactionFilters from "../TransactionFilters/TransactionFilters";
import { formatDate } from "../../utils/formatDate";
import Pagination from "../Pagination/Pagination";
import { formatCurrency } from "../../utils/formatCurrency";

export default function HistoryTransactionCard() {
    const [filters, setFilters] = useState({
        description: '',
        type: '',
        category: '',
        period: '',
        page: 1
    });

    const [debouncedDescription] = useDebounce(filters.description, 500);

    const { transactions, isLoading, meta, isFetching } = useTransactions({
        ...filters,
        description: debouncedDescription,
    });

    

    function handleFilterChange(key, value) {
        setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
    }

    function handlePageChange(newPage){
        setFilters(prev => ({...prev, page: newPage}));
    }

    const totalPages = meta ? Math.ceil(meta.total / meta.limit) : 1

    return (
        <div className="bg-white rounded-xl mt-6">
            <TransactionFilters filters={filters} onFilterChange={handleFilterChange}></TransactionFilters>
            
            <div className={isFetching ? "opacity-50 pointer-events-none transition-opacity" : ""}>
                
                {!isFetching && !isLoading && transactions.length === 0 && (
                    <div className="flex justify-center items-center py-10">
                        <p className="text-gray-500">No transactions found for the selected filters.</p>
                    </div>
                )}

                {!isFetching && !isLoading && transactions.length > 0 && (
                    <div className="flex flex-col gap-3">
                        {transactions.map(t => (
                            <div key={t.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-sm transition-shadow bg-gray-300/30">
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
                                    {t.type === 'INCOME' ? '+' : '-'} {formatCurrency(t.amount)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {console.log(transactions)}

                <Pagination currentPage={filters.page} totalPages={totalPages} onPageChange={handlePageChange}></Pagination>

            </div>
        </div>
    )
}