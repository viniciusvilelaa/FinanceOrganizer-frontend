import { useState, useEffect} from "react";
import { api } from "../context/apiContext";
import { formatCurrency } from "../utils/formatCurrency";
export function useSixMonthChart() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get("/transactions/getChartData")
            .then(({ data }) => setData(data))
            .catch((err) => setError(err))
            .finally(() => setLoading(false))
    }, []);

    const dataEnchanced = data ? data.map((e)=> {
        return{
            month: e.month,
            income: e.income,
            expense: e.expense,
            formattedIncome: formatCurrency(e.income),
            formattedExpense: formatCurrency(e.expense)
        }
    }) : null;

    return {dataEnchanced, error, loading}  

}