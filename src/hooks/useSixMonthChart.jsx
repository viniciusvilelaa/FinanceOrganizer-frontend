import { useState, useEffect, useMemo } from "react";
import { api } from "../context/apiContext";
import { formatCurrency } from "../utils/formatCurrency";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../queryKeys/queryKeys";

const fetchSixMonthChart = async () => {
    const {data} = await api.get("transactions/getChartData");

    return data
}

const MONTH_TRANSLATIONS = {
    "Janeiro": "January", "Fevereiro": "February", "Março": "March",
    "Abril": "April", "Maio": "May", "Junho": "June",
    "Julho": "July", "Agosto": "August", "Setembro": "September",
    "Outubro": "October", "Novembro": "November", "Dezembro": "December",
    "Jan": "Jan", "Fev": "Feb", "Mar": "Mar", "Abr": "Apr", "Mai": "May",
    "Jun": "Jun", "Jul": "Jul", "Ago": "Aug", "Set": "Sep", "Out": "Oct",
    "Nov": "Nov", "Dez": "Dec"
};

export function useSixMonthChart() {
    
    const {data, error, isFetching } = useQuery({
        queryKey:   QUERY_KEYS.sixMonthChart(),
        queryFn: fetchSixMonthChart
    });

    const dataMonthChart = useMemo(() => {
        if (!data) return null;

        return data.map((e) => {
            return {
                month: MONTH_TRANSLATIONS[e.month] || e.month,
                income: e.income,
                expense: e.expense,
                formattedIncome: formatCurrency(e.income),
                formattedExpense: formatCurrency(e.expense)
            }
        })

    }, [data]);

    return { dataMonthChart, error, isFetching }

}