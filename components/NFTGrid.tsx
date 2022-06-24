import { Context, Dispatch, FC, SetStateAction, useContext } from "react";
import styled from "styled-components";
import { NFTSelectionContextType } from "../pages";
import { mobile } from "../styles/breakpoints";
import { transparentOrange } from "../styles/colors";
import { NFT } from "../types/types";
import { SolDenTitle } from "./NavBar";

type NFTGridProps = {
  nftList: NFT[];
  contextToUse: Context<NFTSelectionContextType>;
};

type NFTCardProps = {
  selector?: Dispatch<SetStateAction<NFT | undefined>>;
  nft: NFT;
  selectedMint?: string;
};

export const NFTGrid: FC<NFTGridProps> = ({ nftList, contextToUse }) => {
  const [selected, setSelected] = useContext(contextToUse);

  return (
    <GridContainer>
      <GridBox>
        {nftList.length > 0 ? (
          nftList.map((v) => {
            return <NFTCard selectedMint={selected?.mint} selector={setSelected} key={v.mint} nft={v} />;
          })
        ) : (
          <SolDenTitle style={{ width: "100%", textAlign: "center" }}>Nothing Found!</SolDenTitle>
        )}
      </GridBox>
    </GridContainer>
  );
};

const NFTCard: FC<NFTCardProps> = ({ nft, selector, selectedMint }) => {
  const onClick = () => {
    if (selector) {
      if (selectedMint === nft.mint) {
        selector(undefined);
        return;
      }
      selector(nft);
    }
  };

  const formatName = () => {
    if (nft.symbol === "TSDUP") {
      return nft.name.replace(" - The Sol Den", "");
    } else if (nft.symbol === "TSDMW") {
      return nft.name.replace("The Sol Den - ", "");
    }
    return nft.name;
  };

  return (
    <CardContainer>
      <NFTImage selected={selectedMint === nft.mint} onClick={onClick} src={nft.image} alt="" />
      <NFTTitle selected={selectedMint === nft.mint}>{formatName()}</NFTTitle>
    </CardContainer>
  );
};

const brightessFiler = "filter: brightness(50%);";

const NFTImage = styled.img<{ selected?: boolean }>`
  width: 100%;
  border: 2px white solid;
  ${({ selected }) => (selected ? brightessFiler : "")}
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const NFTTitle = styled.div<{ selected?: boolean }>`
  font-size: 24px;
  color: white;
  ${({ selected }) => (selected ? brightessFiler : "")}
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
`;

const GridContainer = styled.div`
  padding: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GridBox = styled.div`
  display: grid;
  padding: 5px;
  background-color: ${transparentOrange};
  border-radius: 5px;
  grid-template-columns: 1fr 1fr 1fr;
  ${mobile} {
    grid-template-columns: 1fr;
  }
`;
