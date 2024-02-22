export interface Costs {
  avgNetPrice: number;
  netPriceIncome: {
    '<30k': number;
    '30-48k': number;
    '48-75k': number;
    '75-110k': number;
    '110k+': number;
  };
  stickerPrice: {
    inState: number;
    outOfState: number;
  };
  otherCosts: {
    housing: number | null;
    supplies: number | null;
    personal: number | null;
    transportation: number | null;
  };
}
