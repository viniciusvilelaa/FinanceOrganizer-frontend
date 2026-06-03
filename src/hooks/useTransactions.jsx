import axios from "axios";
import { api } from "../context/apiContext";
import { useState, useEffect } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

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
        placeholderData: keepPreviousData
    });

    return {
        transactions: data?.transactions ?? [],
        meta: data?.meta ?? null,
        isLoading,
        error,
        isFetching
    }
}
