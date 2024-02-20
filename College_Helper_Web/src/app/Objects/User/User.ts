import { Demographics } from './Demographics';
import { Scores } from './Scores';

export interface User {
  username: string;
  email: string;
  demographics: Demographics;
  scores: Scores;
  collegePreferences: string[];
  majorPreferences: string[];
  careerPreferences: string[];
  currentCourses: string[];
}
