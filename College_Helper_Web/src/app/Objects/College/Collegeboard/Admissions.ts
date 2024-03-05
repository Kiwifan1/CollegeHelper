import { AcceptanceRate } from './AcceptanceRate';
import { ActRange } from './ActRange';
import { GpaRange } from './GpaRange';
import { SatRange } from './SatRange';

export interface Admissions {
  gpaRange: GpaRange[];
  satRange: SatRange | null;
  actRange: ActRange | null; 
  acceptanceRate: AcceptanceRate | null;
}
