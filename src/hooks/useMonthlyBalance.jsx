import axios from "axios";
import { api } from "../context/apiContext";
import { useState, useEffect } from "react";

export function useMonthlyBalance() {
    const [monthlyBalance, setMonthlyBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        api.get("transactions/monthlySummary", { signal })
            .then(({ data }) => setMonthlyBalance(data))
            .catch((err) => {
                if(!axios.isCancel(err)){
                    setError(err);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    return { monthlyBalance, loading, error }

}