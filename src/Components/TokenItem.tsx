import React, {FC} from "react";
import Image from "next/image";

import genericCrypto from "@/assets/generic-cryptocurrency.svg";
import {useTokenMetadata} from "@/Hooks";

interface TokenItemProps {
  address: string;
  balance: string;
}

export const TokenItem: FC<TokenItemProps> = ({address, balance}) => {
  const {data} = useTokenMetadata(address);

  if (!data) return <></>;

  return (
    <li className="flex flex-col items-center gap-2 rounded-2xl bg-white p-2 text-background  shadow-md shadow-white/50">
      <h3 className="font-semibold">{data.name}</h3>
      <div className="relative h-10 w-10">
        <Image
          alt={`${data.name} logo`}
          layout="fill"
          src={data.logo ?? genericCrypto}
        />
      </div>
      <p className="text-background">
        {(
          Number(balance) / Math.pow(10, data.decimals as number)
        ).toFixed(2)}{" "}
        {data.symbol}{" "}
      </p>
    </li>
  );
};
