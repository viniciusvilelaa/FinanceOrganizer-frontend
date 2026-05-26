import axios from "axios";
import { api } from "../context/apiContext";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchTransactions = async ({ queryKey, signal }) => {
    const [_key, filters] = queryKey;

    const { data } = await api.get("/transactions", {
        params: {
            description: filters.description || undefined,
            type: filters.type || undefined,
            category: filters.category || undefined,
            period: filters.period || undefined,
            page: filters.page || undefined,
            limit: filters.limit || undefined

        },
        signal
    });

    console.log('resposta da API:', data);

    return {
        transactions: Array.isArray(data.transactions) ? data.transactions : [],
        meta: {
            total: data.total,
            page: data.page,
            limit: data.limit
        }
    };

};


export function useTransactions(filters = {}) {
    const { data, isLoading, error, isFetching } = useQuery({
        queryKey: ['transactions', {
            description: filters.description,
            type: filters.type,
            category: filters.category,
            period: filters.period,
            page: filters.page,
            limit: filters.limit
        }],
        queryFn: fetchTransactions,
        placeholderData: (previousData) => previousData
    });

    return {
        transactions: data?.transactions ?? [],
        meta: data?.meta ?? null,
        isLoading,
        error,
        isFetching
    }
}


/*export function useTransactions(filters = {}) {
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
        }, { signal })
            .then(({ data }) => {
                setTransactions(Array.isArray(data.transactions) ? data.transactions : [])
                setMeta({
                    total: data.total,
                    page: data.page,
                    limit: data.limit
                })
            })
            .catch((err) => {
                if (!axios.isCancel(err)) {
                    setError(err);
                }
            })
            .finally(() => setLoading(false))
    }, [filters.description, filters.type, filters.category, filters.period, filters.page]);

    return { transactions, loading, error, meta }
}*/