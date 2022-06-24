import { Reducer } from "react";
import { NFT } from "../types/types";

export type NFTReducerAction = {
  type: "add" | "remove" | "clear";
  payload?: NFT;
};

export const nftReducer: Reducer<NFT[], NFTReducerAction> = (state, action) => {
  switch (action.type) {
    case "add":
      if (action.payload && state.filter((v) => v.mint === action.payload?.mint).length === 0) {
        return [action.payload, ...state];
      } else {
        return state;
      }
    case "remove":
      return state.filter((v) => v.image !== action.payload?.image);
    case "clear":
      return [] as NFT[];
  }
};
