export interface Costs {
  averageNetPrice: number | null;
  netPricebyIncome: incomePrice[];
  stickerPrice: {
    inStateTuition: number | null;
    outOfStateTuition: number | null;
  };
  otherCosts: {
    housing: number | null;
    booksandSupplies: number | null;
    personalExpenses: number | null;
    transportation: number | null;
  };
}

export interface incomePrice {
  income: string;
  netPrice: number | null;
}
