import { createCategory } from "../../services/categoriesApi";
import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { QUERY_KEYS } from "../../queryKeys/queryKeys";
import { toast } from "sonner";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.finance });
      toast.success("Category Created");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Error to create category");
    },
  });

  return { createCategory: mutateAsync, isPending };
}
