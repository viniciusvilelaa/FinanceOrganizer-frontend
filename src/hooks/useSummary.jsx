import { api } from "../context/apiContext";
import { useState, useEffect } from "react";
import axios from "axios";

import React from 'react'

export function useSummary() {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        api.get('/transactions/summary', { signal })
            .then(({ data }) => setSummary(data))
            .catch((err) => {
                if(!axios.isCancel(err)){
                    setError(err);
                }
            })
            .finally(() => setLoading(false))

            return () => {
                controller.abort()
            }

    }, []);

    return { summary, loading, error }

}
