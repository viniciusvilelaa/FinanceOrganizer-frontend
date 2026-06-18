import { api } from "../context/apiContext";
import { useMemo } from "react";
import { formatCurrency } from "../utils/formatCurrency";
import { formatPercentage } from "../utils/formatPercentage";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../queriesKeys/queryKyes";

const fetchCurrentGoal = async () => {
    const {data} = await api.get("/goals/current");

    return data
}

export function useCurrentGoal() {
    
    const {data, error, isFetching } = useQuery({
        queryKey: QUERY_KEYS.goals.current(),
        queryFn: fetchCurrentGoal,
        placeholderData: keepPreviousData
    });

    const isEmpty = !isFetching && (data === null || data === undefined);

    const currentGoalData = useMemo(() => {
        if (!data) return null;

        return {
            id: data.id,
            name: data.name,
            targetAmount: formatCurrency(data.targetAmount),
            currentAmount: formatCurrency(data.currentAmount),
            percentage: formatPercentage(data.percentage),
            month: data.month,
            year: data.year,
            status: data.status
        }
    }, [data]);

    return { currentGoalData, isFetching, error, isEmpty }

}