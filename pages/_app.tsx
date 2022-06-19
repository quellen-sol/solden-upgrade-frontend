import "antd/dist/antd.css";
import "../styles/global.css";
// import "@solana/wallet-adapter-react-ui/styles.css";
import "../styles/sol-overrides.css";
import type { AppProps } from "next/app";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const RPC_URL = "https://mainnet-beta.solflare.network/";
  const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

  return (
    <>
      <ConnectionProvider endpoint={RPC_URL}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <Component {...pageProps} />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
};

export default MyApp;
