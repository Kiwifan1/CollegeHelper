import { Academics } from './Academics';
import { Admissions } from './Admissions';
import { Costs } from './Costs';

export interface CollegeBoard {
  admissions: Admissions;
  academics: Academics;
  costs: Costs;
}
