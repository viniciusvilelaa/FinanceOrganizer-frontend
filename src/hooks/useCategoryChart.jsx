import { api } from "../context/apiContext";
import { useState, useEffect, useMemo } from "react";
import { formatCurrency } from "../utils/formatCurrency";
import { formatPercentage } from "../utils/formatPercentage";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";


const CATEGORY_COLORS = {
    "COMIDA": "#F97316",
    "TRANSPORTE": "#3B82F6",
    "LAZER": "#8B5CF6",
    "SAUDE": "#10B981",
    "EDUCACAO": "#F59E0B",
    "MORADIA": "#EC4899",
    "OUTROS": "#64748B",
    "INVESTIMENTO": "#14B8A6",
    "SALARIO": "#22C55E",
    "ASSINATURAS": "#06B6D4",
    "COMBUSTIVEL": "#F43F5E",
}

const fetchCategoryChart = async () => {
    const { data } = await api.get("/transactions/getPizzaData");

    return data
}

export function useCategoryChart() {




    const { data, error, isFetching } = useQuery({
        queryKey: ['dataCategoryChart'],
        queryFn: fetchCategoryChart
    })


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



    return { dataEnchanced, isFetching, error };
}