import { useQuery } from "@tanstack/react-query";
import { API } from "../../../Config/api";

export const GetCategories = () => {
  const { data: categories, refetch: refetchCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await API.get(`categories`);
      return data;
    },
  });

  return { categories, refetchCategories };
};
