import { Address } from '../Address';

export interface Demographics {
  age: number;
  gender: Gender;
  ethnicity: string;
  nationality: string;
  educationLevel: EducationLevel;
  occupation: Occupation;
  incomeLevel: IncomeLevel;
  maritalStatus: MaritalStatus;
  location: Address;
}

enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

enum EducationLevel {
  HSSR = 'High School Senior',
  HSJR = 'High School Junior',
  HSSO = 'High School Sophomore',
  HSFR = 'High School Freshman',
  COFR = 'College Freshman',
  COSO = 'College Sophomore',
  COJR = 'College Junior',
  COSR = 'College Senior',
}

enum Occupation {
  Student = 'Student',
  Employed = 'Employed',
  Unemployed = 'Unemployed',
  Retired = 'Retired',
  Other = 'Other',
}

enum MaritalStatus {
  Single = 'Single',
  Married = 'Married',
  Divorced = 'Divorced',
  Widowed = 'Widowed',
}

enum IncomeLevel {
  '0-30k' = '0-30k',
  '30k-48k' = '30k-48k',
  '48k-75k' = '48k-75k',
  '75k-110k' = '75k-110k',
  '>110k' = '>110k',
}
