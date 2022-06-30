import { Nft } from "@metaplex-foundation/js";
import { Context, Dispatch, FC, SetStateAction, useContext } from "react";
import styled from "styled-components";
import { NFTSelectionContextType } from "../pages";
import { mobile } from "../styles/breakpoints";
import { transparentOrange } from "../styles/colors";
import { SolDenTitle } from "./NavBar";

type NFTGridProps = {
  nftList: Nft[];
  contextToUse: Context<NFTSelectionContextType>;
};

type NFTCardProps = {
  selector?: Dispatch<SetStateAction<Nft | undefined>>;
  nft: Nft;
  selectedMint?: string;
};

export const NFTGrid: FC<NFTGridProps> = ({ nftList, contextToUse }) => {
  const [selected, setSelected] = useContext(contextToUse);

  return (
    <GridContainer>
      <GridBox>
        {nftList.length > 0 ? (
          nftList.map((v) => {
            return (
              <NFTCard
                selectedMint={selected?.mint.toBase58()}
                selector={setSelected}
                key={v.mint.toBase58()}
                nft={v}
              />
            );
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
      if (selectedMint === nft.mint.toBase58()) {
        selector(undefined);
        return;
      }
      selector(nft);
    }
  };

  const formatName = () => {
    if (nft.symbol === "TSDUP") {
      return nft.name?.replace(" - The Sol Den", "");
    } else if (nft.symbol === "SOLDENMW") {
      return nft.name?.replace("The Sol Den", "Fighter");
    }
    return nft.name;
  };

  return (
    <CardContainer>
      <NFTImage
        selected={selectedMint === nft.mint.toBase58()}
        onClick={onClick}
        src={nft.metadata.image}
        alt="Not Found!"
      />
      <NFTTitle selected={selectedMint === nft.mint.toBase58()}>{formatName()}</NFTTitle>
    </CardContainer>
  );
};

const brightessFilter = "filter: brightness(50%);";

const NFTImage = styled.img<{ selected?: boolean }>`
  width: 100%;
  border: 2px white solid;
  ${({ selected }) => (selected ? brightessFilter : "")}
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const NFTTitle = styled.div<{ selected?: boolean }>`
  font-size: 24px;
  color: white;
  ${({ selected }) => (selected ? brightessFilter : "")}
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
