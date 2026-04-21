import { api } from "../context/apiContext";
import { useState, useEffect } from "react";

export function monthlyBalanceHook() {
    const [monthlyBalance, setMonthlyBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get("transactions/monthlySummary")
            .then(({ data }) => setMonthlyBalance(data))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, []);

    return {monthlyBalance, loading, error}

}