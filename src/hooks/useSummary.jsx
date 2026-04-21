import { api } from "../context/apiContext";
import { useState, useEffect } from "react";

import React from 'react'

export function summaryHook() {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get('/transactions/summary')
            .then(({ data }) => setSummary(data))
            .catch((err) => setError(err))
            .finally(() => setLoading(false))
    }, []);

    return { summary, loading, error }

}
