import { MiscellaneousCriteriaEnum } from '../enums/Miscellaneous';
import { DemographicsEnum } from '../enums/Demographics';
import { UserScore } from './Score';

interface EligibilityCriteria {
  miscellaneous: MiscellaneousCriteria[] | null;
  activity: Activity[] | null;
  currentGradeLevel: CurrentGradeLevel[] | null;
  collegeReadinessProgramParticipation: boolean | null;
  currentSchool: CurrentSchool[] | null;
  affiliation: Affiliation[] | null;
  graduation: boolean | null;
  armedServices: ArmedServices[] | null;
  situation: Situation[] | null;
  profession: boolean | null;
  financialInformation: boolean | null;
  applicationRestriction: boolean | null;
  collegeAttendanceCriteria: boolean | null;
  academics: ScholarshipAcademics[] | null;
  degreeSeeking: string[] | null;
  condition: boolean | null;
  fieldsOfStudy: FieldsOfStudy[] | null;
  enrollmentStatus: string[] | null;
  citizenshipStatuses: string[] | null;
  graduationStatuses: boolean | null;
  locations: Location[] | null;
  interests: Interest[] | null;
  studyAbroad: boolean | null;
  age: boolean | null;
  demographics: DemographicsEnum[] | null;
}

interface MiscellaneousCriteria {
  miscellaneousCriteria: MiscellaneousCriteriaEnum;
}

interface Activity {
  activity: string;
  activityOther: string | null;
}

interface CurrentGradeLevel {
  currentGrade: string;
}

interface CurrentSchool {
  school: School[];
}

interface School {
  ceebCode: string;
  schoolType: string;
  ncesCode: string;
  schoolAddress: SchoolAddress;
  schoolName: string;
}

interface SchoolAddress {
  stateOrProvince: string;
  city: string;
  addressLine1: string;
  zipOrPostalCode: string;
}

interface Affiliation {
  affiliationEntityOther: string | null;
  indirectRelation: string | null;
  affiliationEntity: string;
  directRelation: string;
}

interface ArmedServices {
  armedServiceBranch: string | null;
  armedServiceStatus: string;
  armedServiceRelation: string | null;
}

interface Situation {
  situation: string;
  situationOther: string | null;
}

export interface ScholarshipAcademics {
  academicEligibility: string;
  academicEligibilityValue: number;
}

interface FieldsOfStudy {
  fieldName: string;
  cipCode: string | null;
}

interface Location {
  country: string;
  state?: string;
}

interface Interest {
  interestOther: string | null;
  interestCriteria: string;
}

export interface Scholarship {
  id: string;
  scholarshipName: string;
  programOrgName: string;
  scholarshipStatus: string;
  scholarshipOpen: string;
  scholarshipDeadline: string;
  aboutPara: string;
  amountDisplay: string | null;
  applicationUrl: string;
  programUrl: string;
  applicationFee: number | null;
  eligibilityCriteria: EligibilityCriteria;
  maxAmountFormat: string | null;
  eligibilityCriteriaDescriptions: string[];
  isEssayRequired: boolean;
  isNeedBased: boolean;
  isMeritBased: boolean;
  cbScholarshipId: string;
  score: number;
  similarityId?: string;
  awardMin: number | null;
  awardMax: number | null;
}
