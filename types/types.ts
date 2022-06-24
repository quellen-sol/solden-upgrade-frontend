export type NFT = {
  name: string;
  symbol: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
  properties: {
    creators: [
      {
        address: string;
        share: number;
      },
      {
        address: string;
        share: number;
      },
    ];
  };
  mint: string;
};
