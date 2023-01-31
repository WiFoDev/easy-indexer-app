import {alchemyClient} from "@/utils/getAlchemyClient";

export const getTokenBalance = async (address: string) => {
  const data = await alchemyClient.core.getTokenBalances(address);
  const tokensBalanceNonZero = data.tokenBalances.filter(
    (token) => BigInt(token.tokenBalance as string) !== BigInt("0"),
  );

  return tokensBalanceNonZero;
};
