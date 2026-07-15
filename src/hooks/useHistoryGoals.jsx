import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { api } from "../context/apiContext";
import { QUERY_KEYS } from "../queryKeys/queryKeys";


const fetchGoalsHistory = async ({queryKey, signal}) =>{
    const [_key, _subKey, _subKey2, filters] = queryKey;

    
    const {data} = await api.get("/goals/history", {
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
            page: data?.page
        }
    }

   

}

export function useHistoryGoals(filters = {}) {

    const {data, isLoading, error, isFetching} = useQuery({
        queryKey: QUERY_KEYS.goals.history({
            name: filters.name,
            month: filters.month,
            year: filters.year,
            page: filters.page
        }),
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