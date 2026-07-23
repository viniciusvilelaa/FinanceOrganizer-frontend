import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../queryKeys/queryKeys";
import * as categoryApi from "../../services/categoriesApi";

export function useCategories() {
  const { data, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.categories(),
    queryFn: categoryApi.getCategories,
  });

  return { data, isLoading, isError };
}
