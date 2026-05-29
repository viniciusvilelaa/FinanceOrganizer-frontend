import { api } from "../context/apiContext";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { formatCurrency } from "../utils/formatCurrency";
import { formatPercentage } from "../utils/formatPercentage";
import { useQuery } from "@tanstack/react-query";

const fetchCurrentGoal = async () => {
    const {data} = await api.get("/goals/current");

    return data
}

export function useCurrentGoal() {
    
    const {data, error, isFetching } = useQuery({
        queryKey: ['currentGoalData'],
        queryFn: fetchCurrentGoal
    });



    const currentGoalEnhanced = useMemo(() => {
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

    return { currentGoalEnhanced, isFetching, error }

}