import { NFT } from "../types/types";
import { ROAYLTIES_ADDRESS, TREASURY_ADDRESS } from "./constants";

export const nftBelongsToSolDen = (nft: NFT, compareSymbol: string) => {
  const {
    symbol,
    properties: {
      creators: [c1, c2],
    },
  } = nft;
  return (
    symbol === compareSymbol &&
    (c1.address === TREASURY_ADDRESS.toBase58() || c1.address === ROAYLTIES_ADDRESS.toBase58()) &&
    (c2.address === TREASURY_ADDRESS.toBase58() || c2.address === ROAYLTIES_ADDRESS.toBase58())
  );
};
