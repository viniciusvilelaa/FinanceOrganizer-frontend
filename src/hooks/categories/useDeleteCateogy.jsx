import { deleteCategory } from "../../services/categoriesApi";
import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { QUERY_KEYS } from "../../queryKeys/queryKeys";
import { toast } from "sonner";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.finance });
      toast.success("Category Deleted");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Error to delete category");
    },
  });

  return { deleteCategory: mutateAsync, isPending };
}