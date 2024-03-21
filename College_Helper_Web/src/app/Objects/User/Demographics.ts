import { CitizenshipStatusesEnum } from '../enums/Citizenship';
import { DegreeSeekingEnum } from '../enums/DegreeSeekings';
import { DemographicIdentities, GenderIdentityEnum } from '../enums/Demographics';
import { FieldsOfStudyEnum } from '../enums/FieldsOfStudy';
import { Interest } from '../enums/Interests';
import { MiscellaneousCriteriaEnum } from '../enums/Miscellaneous';

export interface Demographics {
  age: number | null;
  demographicInfo: DemographicInfo;
  educationLevel: EducationLevel | null;
  occupation: Occupation | null;
  incomeLevel: IncomeLevel | null;
  maritalStatus: MaritalStatus | null;
}

export interface DemographicInfo {
  identities: DemographicIdentities;
  citizenships: CitizenshipStatusesEnum[];
  degreeSeeking: DegreeSeekingEnum[];
  fieldsOfStudy: FieldsOfStudyEnum[];
  interests: Interest[];
  miscellaneousCriteria: MiscellaneousCriteriaEnum[];
}

export enum EducationLevel {
  HSFR = 'High School Freshman',
  HSSO = 'High School Sophomore',
  HSJR = 'High School Junior',
  HSSR = 'High School Senior',
  COFR = 'College Freshman',
  COSO = 'College Sophomore',
  COJR = 'College Junior',
  COSR = 'College Senior',
  Grad = 'Graduate',
  Other = 'Other',
  PreferNotToSay = 'Prefer not to say',
}

export enum Occupation {
  Student = 'Student',
  Employed = 'Employed',
  Unemployed = 'Unemployed',
  Retired = 'Retired',
  Other = 'Other',
  PreferNotToSay = 'Prefer not to say',
}

export enum MaritalStatus {
  Single = 'Single',
  Married = 'Married',
  Divorced = 'Divorced',
  Widowed = 'Widowed',
  PreferNotToSay = 'Prefer not to say',
}

export enum IncomeLevel {
  Below30K = '0-30k',
  To48K = '30k-48k',
  To75K = '48k-75k',
  To110K = '75k-110k',
  Above110K = '>110k',
  PreferNotToSay = 'Prefer not to say',
}
