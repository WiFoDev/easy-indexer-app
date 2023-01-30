import {useQuery} from "@tanstack/react-query";

import {getTokenBalance} from "@/Querys";

export const useTokenBalances = (address: string) => {
  const {data, isLoading} = useQuery(["tokenBalances", address], () =>
    getTokenBalance(address),
  );

  return {
    data,
    isLoading,
  };
};
