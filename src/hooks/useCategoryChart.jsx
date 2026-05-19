import { api } from "../context/apiContext";
import { useState, useEffect, useMemo } from "react";
import { formatCurrency } from "../utils/formatCurrency";
import { formatPercentage } from "../utils/formatPercentage";
import axios from "axios";


const CATEGORY_COLORS = {
    "COMIDA": "#F97316",
    "TRANSPORTE": "#3B82F6",
    "LAZER": "#8B5CF6",
    "SAUDE": "#10B981",
    "EDUCACAO": "#F59E0B",
}

export function useCategoryChart() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {

        const controller = new AbortController();
        const signal = controller.signal;

        setLoading(true);

        api.get("/transactions/getPizzaData", { signal })
            .then(({ data }) => { setData(data) })
            .catch((err) => {
                if(!axios.isCancel(err)){
                    setError(err);
                }
            })
            .finally(() => { setLoading(false) });

        return () => {
            controller.abort();
        }

    }, []);


    // Log para testar rapidamente o retorno
    const totalGeral = useMemo(() => data ? data.reduce((acumulador, e) => acumulador + e.total, 0) : 0, [data]);

    let dataEnchanced = useMemo(() => data ? data.map((e) => {
        const percentageValue = totalGeral > 0 ? (e.total / totalGeral) * 100 : 0;
        return {
            category: e.category,
            total: e.total,
            percentage: percentageValue,
            formattedTotal: formatCurrency(e.total),
            formattedPercentage: formatPercentage(percentageValue),
            color: CATEGORY_COLORS[e.category.toUpperCase()] || "#9CA3AF"
        }
    }) : null, [data, totalGeral]);



    return { dataEnchanced, loading, error };
}