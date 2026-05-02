import { api } from "../context/apiContext";
import { useState, useEffect } from "react";

export function useTransactions(filters = {}) {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        
        api.get('/transactions', {params:{
            description: filters.description || undefined,
            type: filters.type || undefined,
            category: filters.category || undefined,
            period: filters.period || undefined
        }})
            .then(({data}) => setTransactions(data))
            .catch((err)=> setError(err))
            .finally(()=> setLoading(false))
    }, [filters.description, filters.type, filters.category, filters.period]);

    return {transactions, loading, error}
}