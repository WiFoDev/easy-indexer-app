import type {AppProps} from "next/app";

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {configureChains, createClient, WagmiConfig} from "wagmi";
import {mainnet, polygon, optimism, arbitrum} from "wagmi/chains";
import {alchemyProvider} from "wagmi/providers/alchemy";
import {publicProvider} from "wagmi/providers/public";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import {Layout} from "@/Layout";

import "@/styles/globals.css";

const {chains, provider} = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
    }),
    publicProvider(),
  ],
);
const {connectors} = getDefaultWallets({
  appName: "Easy Indexer App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});

function MyApp({Component, pageProps}: AppProps) {
  const queryClient = new QueryClient();

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
