import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Col, Row } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import React, { createContext, Dispatch, SetStateAction, useEffect, useReducer, useState } from "react";
import { GameScreen } from "../components/GameScreen";
import { NavBar, SolDenTitle } from "../components/NavBar";
import { NFTGrid } from "../components/NFTGrid";
import { NFT } from "../types/types";
import { loadNFTs } from "../utils/loadNFTs";
import { nftBelongsToSolDen } from "../utils/nftBelongsToSolDen";
import { nftReducer } from "../utils/nftReducer";

export type NFTSelectionContextType = [NFT?, Dispatch<SetStateAction<NFT | undefined>>?];

const Home: NextPage = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const [selectedPack, setSelectedPack] = useState<NFT | undefined>(undefined);
  const [selectedFighter, setSelectedFighter] = useState<NFT | undefined>(undefined);

  const SelectedPackContext = createContext<NFTSelectionContextType>([selectedPack, setSelectedPack]);
  const SelectedFighterContext = createContext<NFTSelectionContextType>([selectedFighter, setSelectedFighter]);

  const [packData, editPackData] = useReducer(nftReducer, []);
  const [fighterData, editFighterData] = useReducer(nftReducer, []);
  const [helpText, setHelpText] = useState("Connect Your Wallet!");

  const packPredicate = (nft: NFT) => {
    return nftBelongsToSolDen(nft, "TSDUP");
  };

  const fighterPredicate = (nft: NFT) => {
    return nftBelongsToSolDen(nft, "TSDMW");
  };

  useEffect(() => {
    if (!wallet.publicKey) {
      setHelpText("Connect your wallet");
      editPackData({ type: "clear" });
      editFighterData({ type: "clear" });
    } else {
      setHelpText("Select a fighter & upgrade pack");
      loadNFTs(wallet.publicKey, connection, packPredicate, fighterPredicate, editPackData, editFighterData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.publicKey]);

  return (
    <>
      <Head>
        <title>The Sol Den - Upgrade Packs</title>
        <meta name="description" content="Upgrade your fighters' stats here by using your upgrade packs!" />
        <meta name="og:image" content="/logo.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SelectedPackContext.Provider value={[selectedPack, setSelectedPack]}>
        <SelectedFighterContext.Provider value={[selectedFighter, setSelectedFighter]}>
          <NavBar />
          <GameScreen>
            <SolDenTitle style={{ marginTop: 50 }} fontSizeOverride={48}>
              {helpText}
            </SolDenTitle>
            {wallet.publicKey && (
              <div style={{ maxWidth: "100%" }}>
                <Row>
                  <Col span={12}>
                    <NFTGrid contextToUse={SelectedFighterContext} nftList={fighterData} />
                  </Col>
                  <Col span={12}>
                    <NFTGrid contextToUse={SelectedPackContext} nftList={packData} />
                  </Col>
                </Row>
              </div>
            )}
          </GameScreen>
        </SelectedFighterContext.Provider>
      </SelectedPackContext.Provider>
    </>
  );
};

export default Home;
