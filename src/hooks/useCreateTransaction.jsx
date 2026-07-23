import { api } from "../services/axiosApi";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../queryKeys/queryKeys";
import { toast } from "sonner";

const fetchCreateTransaction = async ({type, amount, date, category, description}) => {
    const payload = {amount: parseFloat(amount), type, date, category, description};
    
    const {data} = await api.post('/transactions', payload);

    return data
}

export function useCreateTransaction(){
    const queryClient = useQueryClient();

    const {mutateAsync, isPending} = useMutation({
        mutationFn: fetchCreateTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: QUERY_KEYS.finance});
            toast.success("Transaction Created");
        },
        onError: (error) => {toast.error(error.response?.data?.message || "Error to create transaction")}
    });

    return{createTransaction: mutateAsync, isCreating: isPending}
}