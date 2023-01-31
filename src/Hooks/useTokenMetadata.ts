import {useQuery} from "@tanstack/react-query";

import {getTokenMetadata} from "@/Querys";

export const useTokenMetadata = (address: string) => {
  const {data} = useQuery({
    queryKey: ["tokenMetadata", address],
    queryFn: () => getTokenMetadata(address),
  });

  return {data};
};
