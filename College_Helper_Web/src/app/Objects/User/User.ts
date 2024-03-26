import { Address } from '../Address';
import { UserDemographics } from './UserDemographics';
import { Scores } from './Scores';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  salt: string;
  addresses: Address[];
  demographics: UserDemographics;
  scores: Scores;
  collegePreferences: string[];
  majorPreferences: string[];
  careerPreferences: string[];
  currentCourses: string[];
}

export const defaultUser: User = {
  id: '',
  username: '',
  email: '',
  password: '',
  salt: '',
  addresses: [{
    street: null,
    city: null,
    province: null,
    postCode: null,
    country: null,
    website: null,
    latitude: null,
    longitude: null,
  }],
  demographics: {
    age: null,
    demographicInfo: {
      identities: {
        nationality: [],
        genderIdentity: [],
        sexualOrientation: [],
        ethnicity: [],
      },
      citizenships: [],
      degreeSeeking: [],
      fieldsOfStudy: [],
      interests: [],
      miscellaneousCriteria: [],
    },
    educationLevel: null,
    occupation: null,
    incomeLevel: null,
    maritalStatus: null,
  },
  scores: {
    SAT: null,
    ACT: null,
    GPA: null,
    AP: null,
    IB: null,
    PSAT10: null,
    NMSQT: null,
  },
  collegePreferences: [],
  majorPreferences: [],
  careerPreferences: [],
  currentCourses: [],
};
