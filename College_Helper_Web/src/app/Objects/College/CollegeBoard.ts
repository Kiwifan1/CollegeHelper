export interface CollegeBoard {
  admissions: {
    gpaRange: {
      '3.75': number;
      '3.5': number;
      '3.25': number;
      '3.0': number;
      '2.5': number;
      '2.0': number;
      '0.0': number;
    };
    satRange: {
      satTotalRange: {
        min: number;
        max: number;
      };
      satMathRange: {
        min: number;
        max: number;
      };
      satReadingRange: {
        min: number;
        max: number;
      };
    };
    actRange: {
      compositeRange: {
        min: number;
        max: number;
      };
    };
    acceptanceRate: {
      description: string;
      rate: string;
      applicantCount: number;
      admittedCount: number;
      enrolledCount: number;
    };
  };
  academics: {
    graduationRate: string;
    retentionRate: string;
    studentFacultyRatio: string;
  };
  costs: {
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
  };
}
