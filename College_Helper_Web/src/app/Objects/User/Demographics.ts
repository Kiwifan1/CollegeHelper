import { Address } from '../Address';

export interface Demographics {
  age: number | null;
  gender: Gender | null;
  ethnicity: Ethnicity | null;
  educationLevel: EducationLevel | null;
  occupation: Occupation | null;
  incomeLevel: IncomeLevel | null;
  maritalStatus: MaritalStatus | null;
  location: Address | null;
}

export enum Ethnicity {
  White = 'White',
  Black = 'Black',
  Hispanic = 'Hispanic',
  Asian = 'Asian',
  NativeAmerican = 'Native American',
  PacificIslander = 'Pacific Islander',
  Other = 'Other',
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export enum EducationLevel {
  HSSR = 'High School Senior',
  HSJR = 'High School Junior',
  HSSO = 'High School Sophomore',
  HSFR = 'High School Freshman',
  COFR = 'College Freshman',
  COSO = 'College Sophomore',
  COJR = 'College Junior',
  COSR = 'College Senior',
}

export enum Occupation {
  Student = 'Student',
  Employed = 'Employed',
  Unemployed = 'Unemployed',
  Retired = 'Retired',
  Other = 'Other',
}

export enum MaritalStatus {
  Single = 'Single',
  Married = 'Married',
  Divorced = 'Divorced',
  Widowed = 'Widowed',
}

export enum IncomeLevel {
  '0-30k' = '0-30k',
  '30k-48k' = '30k-48k',
  '48k-75k' = '48k-75k',
  '75k-110k' = '75k-110k',
  '>110k' = '>110k',
}
