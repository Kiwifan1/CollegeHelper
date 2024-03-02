import { Academics } from './Collegeboard/Academics';
import { Admissions } from './Collegeboard/Admissions';
import { CollegeBoard } from './Collegeboard/CollegeBoard';
import { Costs } from './Collegeboard/Costs';
import { Division } from './Course';
import { GeneralInfo } from './GeneralInfo';
import { Officer } from './Officer';
import { Population } from './Population';

export interface College {
  name: string;
  generalInformation: GeneralInfo;
  officers: Officer[];
  divisions: Division[];
  degrees: Division[];
  studentStaffNumbers: {
    students: {
      statisticsYear: string | null;
      total: number | null;
    };
    staff: {
      statisticsYear: string | null;
      fullTimeTotal: number | null;
    };
  };
  admissions: Admissions;
  academics: Academics;
  costs: Costs;
  ceeb: string | null;
  id: string;
}
