import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { api } from "../context/apiContext";


const fetchGoalsHistory = async ({queryKey, signal}) =>{
    const [_key, filters] = queryKey;

    const {data} = await api.get("/goal/history", {
        params: {
            name: filters?.name || undefined,
            month: filters?.month || undefined,
            year: filters?.year || undefined,
            page: filters?.page || undefined
        },
        signal
    })

    return{
        goalsHistory: Array.isArray(data.enchancedGoals) ? data.enchancedGoals : [],
        meta: {
            total: data.total,
            page: data.page,
            limit: data.limit,
            page: filters?.page
        }
    }

}

export function useHistoryGoals(filters = {}) {

    const {data, isLoading, error, isFetching} = useQuery({
        queryKey: ['goalHistory', {
            name: filters.name,
            month: filters.month,
            year: filters.year
        }],
        queryFn: fetchGoalsHistory,
        placeholderData: keepPreviousData
    });

    return{
        goalsHistory: data?.goalsHistory ?? [],
        meta: data?.meta ?? null,
        isFetching,
        isLoading,
        error
    }
    
}