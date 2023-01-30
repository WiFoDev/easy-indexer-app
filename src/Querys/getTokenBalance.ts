import {Alchemy, Network} from "alchemy-sdk";

const settings = {
  apiKey: "oqn6yIU_bcHgkSNXEycAv-Ikr5OYRdP-", // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

export const getTokenBalance = async (address: string) => {
  const data = await alchemy.core.getTokenBalances(address);

  return data;
};
