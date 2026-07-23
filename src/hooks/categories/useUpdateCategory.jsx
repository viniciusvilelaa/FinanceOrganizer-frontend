import { updateCategory } from "../../services/categoriesApi";
import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { QUERY_KEYS } from "../../queryKeys/queryKeys";
import { toast } from "sonner";

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, data }) => updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.finance });
      toast.success("Category Updated");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Error to update the category",
      );
    },
  });

  return { updateCategory: mutateAsync, isPending };
}
