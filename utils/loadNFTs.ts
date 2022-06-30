import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex, Nft } from "@metaplex-foundation/js";
import { Dispatch } from "react";
import { NFTReducerAction } from "./nftReducer";

export const loadNFTs = async (
  pubkey: PublicKey,
  connection: Connection,
  packPredicate: (value: Nft) => boolean,
  fighterPredicate: (value: Nft) => boolean,
  packReducer: Dispatch<NFTReducerAction>,
  fighterReducer: Dispatch<NFTReducerAction>,
) => {
  const metaplex = new Metaplex(connection);
  const nfts = await metaplex.nfts().findAllByOwner(pubkey);

  for (const nft of nfts) {
    if (packPredicate(nft)) {
      nft.metadataTask.run();
      nft.metadataTask.onSuccess(() => packReducer({ type: "add", payload: nft }));
      continue;
    }
    if (fighterPredicate(nft)) {
      nft.metadataTask.run();
      nft.metadataTask.onSuccess(() => fighterReducer({ type: "add", payload: nft }));
    }
  }
};
