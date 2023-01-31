import React, {FC, useEffect, useRef, useState} from "react";
import Image from "next/image";
import {Alchemy, Network, TokenMetadataResponse} from "alchemy-sdk";

import genericCrypto from "@/assets/generic-cryptocurrency.svg";

const settings = {
  apiKey: "oqn6yIU_bcHgkSNXEycAv-Ikr5OYRdP-",
  network: Network.ETH_MAINNET,
};

interface TokenItemProps {
  address: string;
  balance: string;
}

export const TokenItem: FC<TokenItemProps> = ({address, balance}) => {
  const alchemySDKRef = useRef<Alchemy | null>(null);
  const [data, setData] = useState<TokenMetadataResponse | null>(
    null,
  );

  useEffect(() => {
    if (!alchemySDKRef.current) {
      alchemySDKRef.current = new Alchemy(settings);
    }
    alchemySDKRef.current.core
      .getTokenMetadata(address)
      .then((_data) => {
        setData(_data);
      });
  }, [address]);
  if (!data) return <></>;

  return (
    <li className="flex flex-col items-center gap-2 rounded-2xl bg-white p-2 text-background  shadow-md shadow-white/50">
      <h3>{data.name}</h3>
      <div className="relative h-10 w-10">
        <Image
          alt={`${data.name} logo`}
          layout="fill"
          src={data.logo ?? genericCrypto}
        />
      </div>
      <p>
        {balance / Math.pow(10, data.decimals as number)}{" "}
        {data.symbol}{" "}
      </p>
    </li>
  );
};
