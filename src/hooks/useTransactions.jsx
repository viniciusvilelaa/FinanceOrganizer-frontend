import { api } from "../context/apiContext";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../queryKeys/queryKeys";

const fetchTransactions = async ({ queryKey, signal }) => {
   const [_key, _subKey, filters] = queryKey;

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
        queryKey: QUERY_KEYS.transactions(filters),
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
