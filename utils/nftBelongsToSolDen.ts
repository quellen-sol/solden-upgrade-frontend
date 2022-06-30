import { Nft } from "@metaplex-foundation/js";
import { PublicKey } from "@solana/web3.js";
import { ROAYLTIES_ADDRESS, TREASURY_ADDRESS } from "./constants";

export const packBelongsToSolDen = (nft: Nft, compareSymbol: string) => {
  const { symbol } = nft;
  const CM_ADDRESS = new PublicKey("Dioa54CSCU6ZpNZ9rG7HmV2x5zkZUXRk9AZUeNSDUnvp");
  if (nft.creators && symbol === compareSymbol) {
    for (const creator of nft.creators) {
      if (
        !creator.address.equals(ROAYLTIES_ADDRESS) &&
        !creator.address.equals(TREASURY_ADDRESS) &&
        !creator.address.equals(CM_ADDRESS)
      ) {
        return false;
      }
    }
    return true;
  }
  return false;
};

export const fighterBelongsToSolDen = (nft: Nft, compareSymbol: string) => {
  const { symbol } = nft;
  const secondaryWallets = [
    "GT32JhbAeWxtgkDxHnCsMKbYmPc1MSkwjGRpHXUPuQ14",
    "EfQe36MxH2dMXMCf6A3ubFoqDRwpHsVEEv4vN4MNCHa",
  ];
  if (nft.creators && symbol === compareSymbol) {
    for (const creator of nft.creators) {
      const { address } = creator;
      if (!address.equals(ROAYLTIES_ADDRESS) && !secondaryWallets.includes(address.toBase58())) {
        return false;
      }
    }
    return true;
  }
  return false;
};
