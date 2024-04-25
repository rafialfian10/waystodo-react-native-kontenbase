import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { UserContext } from "../../../Context/UserContext";
import { API } from "../../../Config/api";

export const GetUser = () => { 
  const {
    data: user,
    isLoading: isLoadingUser,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await API.get(`/auth/user?$lookup=*`);
      return data;
    },
  });

  return { user, isLoadingUser, refetchUser };
};
