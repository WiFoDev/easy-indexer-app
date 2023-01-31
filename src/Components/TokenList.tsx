import React, {FC} from "react";

import {useTokenBalances} from "@/Hooks";

import {TokenItem} from "./TokenItem";

interface TokenListProps {
  address: string;
  enabled: boolean;
}

export const TokenList: FC<TokenListProps> = ({address, enabled}) => {
  const {data, isFetching} = useTokenBalances(address, enabled);

  if (isFetching) return <div>Loading...</div>;

  return (
    <ul className="grid grid-cols-auto gap-5">
      {data &&
        data.map((token) => {
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
