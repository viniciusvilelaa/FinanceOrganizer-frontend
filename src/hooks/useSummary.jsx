import { api } from "../context/apiContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchSummary = async () => {
    const { data } = await api.get('transactions/summary')
    console.log(data)
    return data
}

export function useSummary() {

    const query = useQuery({
        queryKey: ['summary'],
        queryFn: fetchSummary
    });


    return query

}
