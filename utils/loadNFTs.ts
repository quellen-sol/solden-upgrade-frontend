import { Connection, PublicKey } from "@solana/web3.js";
import { programs } from "@metaplex/js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { NFT } from "../types/types";
import { Dispatch } from "react";
import { NFTReducerAction } from "./nftReducer";
const {
  metadata: { Metadata },
} = programs;

export const loadNFTs = async (
  pubkey: PublicKey,
  connection: Connection,
  predicate: (value: NFT) => boolean,
  reducerToApply: Dispatch<NFTReducerAction>,
) => {
  const loadMeta = async (mint: PublicKey): Promise<NFT | null> => {
    try {
      const meta = await Metadata.load(connection, await Metadata.getPDA(mint));
      const uri = meta.data.data.uri;
      const abortController = new AbortController();
      setTimeout(() => abortController.abort(), 5000);
      return await (await fetch(uri, { method: "GET", signal: abortController.signal })).json();
    } catch {
      return null;
    }
  };

  const tokenAccounts = await (
    await connection.getParsedTokenAccountsByOwner(pubkey, { programId: TOKEN_PROGRAM_ID })
  ).value.filter((v) => v.account.data.parsed.info.tokenAmount.uiAmount === 1);
  for (const acc of tokenAccounts) {
    const mint = acc.account.data.parsed.info.mint;
    loadMeta(mint)
      .then((meta) => {
        if (meta && predicate(meta)) {
          meta.mint = mint;
          reducerToApply({ type: "add", payload: meta });
        }
      })
      .catch(console.log);
  }
};
