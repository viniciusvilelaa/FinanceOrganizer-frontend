import { api } from "../context/apiContext";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { formatCurrency } from "../utils/formatCurrency";
import { formatPercentage } from "../utils/formatPercentage";

export function useCurrentGoal() {
    const [currentGoal, setCurrentGoal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        api.get("/goals/current", { signal })
            .then(({ data }) => setCurrentGoal(data))
            .catch((err) => {
                if (!axios.isCancel(err)) {
                    setError(err);
                }
            })
            .finally(() => setLoading(false))

        return () => {
            controller.abort()
        }

    }, []);



    const currentGoalEnhanced = useMemo(() => {
        if (!currentGoal) return null;

        return {
            id: currentGoal.id,
            targetAmount: formatCurrency(currentGoal.targetAmount),
            currentAmount: formatCurrency(currentGoal.currentAmount),
            percentage: formatPercentage(currentGoal.percentage),
            month: currentGoal.month,
            year: currentGoal.year,
            status: currentGoal.status
        }
    }, [currentGoal]);

    return { currentGoalEnhanced, loading, error }

}