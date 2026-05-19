import axios from "axios";
import { api } from "../context/apiContext";
import { useState, useEffect } from "react";

export function useTransactions(filters = {}) {
    const [transactions, setTransactions] = useState([]);
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);

        const controller = new AbortController();
        const signal = controller.signal;

        api.get('/transactions', {
            params: {
                description: filters.description || undefined,
                type: filters.type || undefined,
                category: filters.category || undefined,
                period: filters.period || undefined,
                page: filters.page || 1,
                limit: filters.limit || 5
            }
        }, {signal})
            .then(({ data }) => {
                setTransactions(Array.isArray(data.transactions) ? data.transactions : [])
                setMeta({
                    total: data.total,
                    page: data.page,
                    limit: data.limit
                })
            })
            .catch((err) => {
                if(!axios.isCancel(err)){
                    setError(err);
                }
            })
            .finally(() => setLoading(false))
    }, [filters.description, filters.type, filters.category, filters.period, filters.page]);

    return { transactions, loading, error, meta }
}