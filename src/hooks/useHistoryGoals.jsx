import { useEffect, useState } from "react";
import { api } from "../context/apiContext";
import { formatCurrency } from "../utils/formatCurrency";
import axios from "axios";

export function useHistoryGoals() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        api.get("/goals/history", { signal })
            .then(({ data }) => setData(data))
            .catch((err)=> {
                if(!axios.isCancel(err)){
                    setError(err)
                }
            })
            .finally(()=> setLoading(false))
        
            return () => {
                controller.abort();
            }


    }, []);

    const historyGoals = data ? data.map((goal)=> {
        return {
            id: goal.id,
            targetAmount: formatCurrency(goal.targetAmount),
            currentAmount: formatCurrency(goal.currentAmount),
            month: goal.month,
            year: goal.year,
            achieved: goal.achieved,
            status: goal.status
        }
    }) : null;

    return { historyGoals, loading, error}
}