import {alchemyClient} from "@/utils/getAlchemyClient";

export const getTokenMetadata = async (address: string) => {
  const data = await alchemyClient.core.getTokenMetadata(address);

  return data;
};
