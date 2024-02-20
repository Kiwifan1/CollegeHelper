import { Address } from './Address';

export interface GeneralInfo {
  address: Address;
  funding: string;
  history: string;
  academicYear: string;
  languages: string[];
  accreditations: string[];
}
