import "../HistoryTransactionCard/HistoryTransactionCard.css"
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useTransactions } from "../../hooks/useTransactions";
import TransactionFilters from "../TransactionFilters/TransactionFilters";

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
        <main>
            <TransactionFilters filters={filters} onFilterChange={handleFilterChange}></TransactionFilters>
        </main>
    )
}