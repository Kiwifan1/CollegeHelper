import { Address } from '../Address';

export interface GeneralInfo {
  address: Address;
  institutionFunding: string;
  history: string;
  academicYear: string;
  languages: string[];
  accreditingAgency: string[];
  studentBody: string;
}
