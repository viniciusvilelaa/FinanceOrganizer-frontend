import { useState, useEffect, useMemo } from "react";
import { api } from "../context/apiContext";
import { formatCurrency } from "../utils/formatCurrency";
import axios from "axios";

export function useSixMonthChart() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;


        api.get("/transactions/getChartData", { signal })
            .then(({ data }) => setData(data))
            .catch((err) => {
                if (!axios.isCancel(err)) {
                    setError(err);
                }
            })
            .finally(() => setLoading(false))

        return () => {
            controller.abort();
        }
    }, []);

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

    return { dataMonthChart, error, loading }

}