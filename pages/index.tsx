import { Nft } from "@metaplex-foundation/js";
import {
  createBurnCheckedInstruction,
  createCloseAccountInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import { Col, Row } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import React, { createContext, Dispatch, SetStateAction, useEffect, useReducer, useRef, useState } from "react";
import styled from "styled-components";
import { GameScreen } from "../components/GameScreen";
import { NavBar, SolDenTitle } from "../components/NavBar";
import { NFTGrid } from "../components/NFTGrid";
import { ProcessingModal } from "../components/ProcessingModal";
import { orange } from "../styles/colors";
import { API_URL } from "../utils/constants";
import { loadNFTs } from "../utils/loadNFTs";
import { fighterBelongsToSolDen, packBelongsToSolDen } from "../utils/nftBelongsToSolDen";
import { nftReducer } from "../utils/nftReducer";
import { errorNotify, infoNotify, successNotify } from "../utils/notifications";

export type NFTSelectionContextType = [Nft | undefined, Dispatch<SetStateAction<Nft | undefined>>];

const Home: NextPage = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const [selectedPack, setSelectedPack] = useState<Nft | undefined>(undefined);
  const [selectedFighter, setSelectedFighter] = useState<Nft | undefined>(undefined);

  const SelectedPackContext = createContext<NFTSelectionContextType>([selectedPack, setSelectedPack]);
  const SelectedFighterContext = createContext<NFTSelectionContextType>([selectedFighter, setSelectedFighter]);

  const [packData, editPackData] = useReducer(nftReducer, []);
  const [fighterData, editFighterData] = useReducer(nftReducer, []);
  const [helpText, setHelpText] = useState("Connect Your Wallet!");
  const [showContinueButton, setShowButton] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [refreshLoad, setRefresh] = useState(false);

  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const packPredicate = (nft: Nft) => {
    return packBelongsToSolDen(nft, "TSDUP");
  };

  const fighterPredicate = (nft: Nft) => {
    return fighterBelongsToSolDen(nft, "SOLDENMW");
  };

  const clearNFTState = () => {
    editPackData({ type: "clear" });
    editFighterData({ type: "clear" });
    setSelectedFighter(undefined);
    setSelectedPack(undefined);
  };

  useEffect(() => {
    if (!wallet.publicKey) {
      setHelpText("Connect your wallet");
      clearNFTState();
    } else {
      setHelpText("Select a fighter & upgrade pack");
      loadNFTs(wallet.publicKey, connection, packPredicate, fighterPredicate, editPackData, editFighterData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.publicKey, refreshLoad]);

  useEffect(() => {
    if (selectedFighter && selectedPack) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [selectedFighter, selectedPack]);

  const submitClick = async () => {
    if (submitButtonRef.current?.disabled !== undefined && wallet.publicKey) {
      const fighterMint = selectedFighter?.mint;
      const packMint = selectedPack?.mint;
      if (fighterMint && packMint) {
        const packATA = await getAssociatedTokenAddress(packMint, wallet.publicKey);
        try {
          submitButtonRef.current.disabled = true;
          setModalVisible(true);
          const txn = new Transaction();
          txn.add(createBurnCheckedInstruction(packATA, packMint, wallet.publicKey, 1, 0));
          txn.add(createCloseAccountInstruction(packATA, wallet.publicKey, wallet.publicKey));
          const signature = await wallet.sendTransaction(txn, connection);
          const txnLink = `https://solscan.io/tx/${signature}`;
          connection.confirmTransaction(signature, "confirmed").then(() => {
            successNotify(
              "Confirmed Transaction!",
              <a href={txnLink} target="_blank" rel="noreferrer">
                View on SolScan
              </a>,
            );
            clearNFTState();
            setRefresh(!refreshLoad);
          });
          infoNotify(
            "Processing Transaction...",
            <a href={txnLink} target="_blank" rel="noreferrer">
              View on SolScan
            </a>,
          );
          const reqPayload = {
            signature,
            packMint: packMint.toBase58(),
            fighterMint: fighterMint.toBase58(),
            fromWallet: wallet.publicKey.toBase58(),
          };
          const resp = await fetch(`${API_URL}/processupgrade`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reqPayload),
          });
          if (resp.ok) {
          }
        } catch (e: any) {
          errorNotify("Error", e.message);
        }
      }
      setModalVisible(false);
      submitButtonRef.current.disabled = false;
    }
  };

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
          <ProcessingModal visible={modalVisible} />
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
            {showContinueButton && (
              <ContinueButton ref={submitButtonRef} onClick={submitClick}>
                Submit
              </ContinueButton>
            )}
          </GameScreen>
        </SelectedFighterContext.Provider>
      </SelectedPackContext.Provider>
    </>
  );
};

const ContinueButton = styled.button`
  font-family: Lovelo;
  background-color: black;
  position: fixed;
  bottom: 50px;
  color: ${orange};
  border: 2px solid ${orange};
  border-radius: 5px;
  padding: 10px 20px;
  transition: 100ms;
  z-index: 2;
  &:hover {
    background-color: ${orange};
    color: black;
    padding: 10px 25px;
    cursor: pointer;
  }
`;

export default Home;
