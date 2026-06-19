import axios from "axios";
import { api } from "../context/apiContext";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../queryKeys/queryKeys";


const fetchMonthlyBalance = async () => {
    const { data } = await api.get("transactions/monthlySummary");
    console.log("Monthsumary response", data);
    return data
}




export function useMonthlyBalance() {

    const query = useQuery({
        queryKey: QUERY_KEYS.monthlyBalance(),
        queryFn: fetchMonthlyBalance
    });

    return query

}