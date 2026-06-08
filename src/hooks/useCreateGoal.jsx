import { api } from "../context/apiContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
            queryClient.invalidateQueries({queryKey: ['currentGoalData']})
            toast.success("Meta criada com sucesso!")
        },
        onError: (error) => {toast.error(error.response.data?.message || "Error ao criar meta")},
    })

    return {mutate, isPending}
}
