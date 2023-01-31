import {useQuery} from "@tanstack/react-query";

import {getTokenBalance} from "@/Querys";

export const useTokenBalances = (
  address: string,
  enabled: boolean,
) => {
  const {data, isLoading, isFetching} = useQuery({
    queryKey: ["tokenBalances", address],
    queryFn: () => getTokenBalance(address),
    enabled,
  });

  return {
    data,
    isLoading,
    isFetching,
  };
};
