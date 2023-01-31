import React, {FC} from "react";
import Image from "next/image";

import {useTokenBalances} from "@/Hooks";
import warningIcon from "@/assets/warning.svg";

import {TokenItem} from "./TokenItem";

interface TokenListProps {
  address: string;
  enabled: boolean;
}

export const TokenList: FC<TokenListProps> = ({address, enabled}) => {
  const {data, isFetching} = useTokenBalances(address, enabled);

  if (isFetching) return <div>Loading...</div>;
  if (data?.length === 0)
    return (
      <div className="flex w-1/3 flex-col items-center gap-2 rounded-lg border-2 border-secondary bg-[#f8d7da] p-4 text-center text-xl text-[#721c24] shadow-md shadow-secondary/30">
        <div className="relative h-10 w-10">
          <Image alt="Warning Icon" layout="fill" src={warningIcon} />
        </div>
        Oops, it looks like you don&apos;t have any money, add some
        funds to your account so you can eat today
      </div>
    );

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
