import { api } from "../context/apiContext";
import { useState, useEffect } from "react";

export function transactionsHook() {
    const [transactions, setTransactions] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get('/transactions')
            .then(({data}) => setTransactions(data))
            .catch((err)=> setError(err))
            .finally(()=> setLoading(false))
    }, []);

    return {transactions, loading, error}
}