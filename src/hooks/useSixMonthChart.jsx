import { useState, useEffect, useMemo } from "react";
import { api } from "../context/apiContext";
import { formatCurrency } from "../utils/formatCurrency";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../queriesKeys/queryKyes";

const fetchSixMonthChart = async () => {
    const {data} = await api.get("transactions/getChartData");

    return data
}

export function useSixMonthChart() {
    
    const {data, error, isFetching } = useQuery({
        queryKey:   QUERY_KEYS.sixMonthChart(),
        queryFn: fetchSixMonthChart
    });

    const dataMonthChart = useMemo(() => {
        if (!data) return null;

        return data.map((e) => {
            return {
                month: e.month,
                income: e.income,
                expense: e.expense,
                formattedIncome: formatCurrency(e.income),
                formattedExpense: formatCurrency(e.expense)
            }
        })

    }, [data]);

    return { dataMonthChart, error, isFetching }

}