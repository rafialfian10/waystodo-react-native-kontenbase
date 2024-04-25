import { useQuery } from "@tanstack/react-query";

import { API } from "../../../Config/api";

export const GetTodos = () => {
  const {
    data: todos,
    isLoading: isLoadingTodos,
    refetch: refetchTodos,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data } = await API.get(`/todos?$lookup=*`);
      return data;
    },
  });

  return { todos, isLoadingTodos, refetchTodos };
};
