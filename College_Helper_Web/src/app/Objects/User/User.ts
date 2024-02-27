import { Address } from '../Address';
import { Demographics } from './Demographics';
import { Scores } from './Scores';

export interface User {
  username: string;
  Email: string;
  password: string;
  address: Address;
  demographics: Demographics;
  scores: Scores;
  collegePreferences: string[];
  majorPreferences: string[];
  careerPreferences: string[];
  currentCourses: string[];
}

export const defaultUser: User = {
  username: "test",
  Email: "test@test.com",
  password: "abc123",
  address: {
    street: null,
    city: null,
    state: null,
    zip: null,
    country: null,
    website: null,
  },
  demographics: {
    age: null,
    gender: null,
    ethnicity: null,
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
