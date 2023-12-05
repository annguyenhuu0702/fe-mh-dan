import { useQuery } from "@tanstack/react-query";
import { authApi } from "../services/apis/authApi";

const useAuth = () => {
  const { data: user } = useQuery({
    queryKey: ["getProfile"],
    queryFn: () => authApi.getProfile(),
  });

  return { user: user?.data };
};

export default useAuth;
