import React, {FC} from "react";

import {useTokenBalances} from "@/Hooks";

import {TokenItem} from "./TokenItem";

interface TokenListProps {
  address: string;
}

export const TokenList: FC<TokenListProps> = ({address}) => {
  const {data, isLoading} = useTokenBalances(address);

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul className="grid grid-cols-auto gap-5">
      {data &&
        data.tokenBalances.map((token) => {
          return (
            <TokenItem
              key={token.contractAddress}
              address={token.contractAddress}
              balance={token.tokenBalance as string}
            />
          );
        })}
    </ul>
  );
};
