import { api } from "../context/apiContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "../queryKeys/queryKeys";

const fetchCreateGoal = async ({name, targetAmount, month, year}) => {
    const payload = {name, targetAmount, month, year};
    const response = await api.post("/goals", payload);

    return response.data
}


export function useCreateGoal(){
    const queryClient = useQueryClient()

    const {mutate, isPending} = useMutation({
        mutationFn: fetchCreateGoal,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: QUERY_KEYS.goals.current()})
            toast.success("Goal created successfully!")
        },
        onError: (error) => {toast.error(error.response.data?.message || "Error when creating goal")},
    })

    return {mutate, isPending}
}
