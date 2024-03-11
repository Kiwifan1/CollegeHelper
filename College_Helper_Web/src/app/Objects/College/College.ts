import { Division } from './Course';
import { Officer } from './Officer';

interface StudyOption {
  studyOptionDescription: string;
  studyOptionCode: string;
}

interface StudentSport {
  genderDescription: string;
  sportCode: string;
  genderCode: string;
  sportTypeDescription: string;
  sportTypeCode: string;
  sportDescription: string;
}

interface StudentActivity {
  higherEducationActivityDescription: string;
  onCampusHousingIndicator: string;
  higherEducationActivityCode: string;
}

interface HousingOption {
  housingOptionCode: string;
  housingOptionDescription: string;
}

interface SocialMedia {
  youtube: string[];
  twitter: string[];
  other: string[];
  facebook: string[];
  instagram: string[];
  linkedin: string[];
}

interface SatScores {
  //added
  rsatMathScore25thPercentile: number;
  rsatMathScore75thPercentile: number;
  rsatEbrwScore25thPercentile: number;
  rsatEbrwScore75thPercentile: number;
}

interface SatCompositeScores {
  //added
  satCompositeScore25thPercentile: number;
  satCompositeScore75thPercentile: number;
}

interface ActScores {
  // added
  actCompositeScore25thPercentile: number | null;
  actCompositeScore75thPercentile: number | null;
}

interface ApExamValues {
  apcpPlacementOnly: boolean | null;
  apcpMinScoreRequired: number;
  apcpCreditsAwarded: string;
  apcpCourseEquivalent: string;
  apcpSchoolMajor: string;
  apcpCreditUsedFor: string | null;
}

interface ApExamType {
  code: string;
  values: ApExamValues[];
  examType: string;
}

interface FinancialAid {
  // added
  studentsReceivingAidPercent: number | null;
  freshmenWithNeedAidPercent: number | null;
  financialAidMetPercent: number | null;
  averageAidAwarded: number | null;
  needBasedAward: number | null;
  needBasedLoanAmount: number | null;
  nonNeedBasedAid: number | null;
  graduationDebt: number | null;
  needBasedFinAidForIntlStudentsInd: boolean;
  nonNeedBasedFinAidForIntlStudentsInd: boolean;
  financialAidOfficePhoneNumber: string;
}

interface HighSchool {
  gpaConsideration: string;
  highSchoolRank: string;
  prepCourses: string;
  recommendations: string;
  gpa400: number | null;
  gpa375To399: number | null;
  gpa350To374: number | null;
  gpa325To349: number | null;
  gpa300To324: number | null;
  gpa250To299: number | null;
  gpa200To249: number | null;
  gpa100To199: number | null;
  gpaBelow100: number | null;
}

interface TuitionInfo {
  // added
  inStateTuition: number;
  outOfStateTuition: number;
  privateTuition: number | null;
  averageHousingCost: number;
  booksAndSuppliesCost: number;
  estimatedPersonalExpenses: number | null;
  transportationCosts: number;
}

interface NetPriceByIncome {
  // added
  averageNetPriceBelow30K: number | null;
  averageNetPrice30To48K: number | null;
  averageNetPrice48To75K: number | null;
  averageNetPrice75To110K: number | null;
  averageNetPriceAbove110K: number | null;
}

interface SchoolSpecialization {
  // added
  specializedSchoolHistoricallyBlackInd: string;
  specializedSchoolTribalCollegeInd: string;
  specializedSchoolHispanicServingInd: string;
  specializedSchoolMensCollegeInd: string;
  specializedSchoolWomensCollegeInd: string;
}

interface ApplicationInformation {
  // added
  earlyActionDate: string | null;
  earlyDecision: string | null;
  earlyDecisionDate: string | null;
  regularDecisionDate: string | null;
  financialAidApplicationPriorityDeadline: string;
  financialAidApplicationRegularDeadline: string | null;
  feeWaiverCode: string;
  feeWaiverIndicator: string;
  diCode: string;
  applicationSiteUrl: string;
  netPriceCalculatorUrl: string;
  commuterOrResidential: string;
  locationCode: string;
  notificationDate: string | null;
  responseDeadline: string | null;
  applicationsAccepted: string[];
}

interface ApplicantInformation {
  // added
  totalApplicants: number;
  admittedApplicants: number;
  enrolledApplicants: number;
}

interface ApScoreInformation {
  // added
  apPlacementAwarded: boolean;
  apCreditAwarded: boolean;
  apInstPolicyUrl: string;
  apInstPolicyDescription: string;
  apExamTypes: ApExamType[];
}

interface Demographics {
  // added
  africanAmericanPercent: number | null;
  asianPercent: number | null;
  hispanicPercent: number | null;
  multiracialPercent: number | null;
  nativeAmericanPercent: number | null;
  pacificIslanderPercent: number | null;
  unknownPercent: number | null;
  whitePercent: number | null;
  internationalPercent: number | null;
  outOfStatePercent: number;
  studentFacultyRatio: number | null;
}

interface EnrollmentData {
  // added
  totalUndergraduates: number | null;
  totalGraduates: number | null;
  fullTimeEnrolled: number | null;
  partTimeEnrolled: number | null;
}

interface LocationInfo {
  city: string;
  state: string;
  country: string;
  zipCode: string;
  countryName: string;
  countryCode: string | null;
  lat: string;
  lon: string;
  streetAddress: string;
  nationalDialingCode: string;
  localNumber: string;
}

interface ContactInfo {
  contactPhone: string;
  contactPhoneFormatted: string;
  contactPhoneUri: string;
}

interface FinancialInfo {
  averageNetPrice: number;
  financialNeedMet: string | null;
  applicationFeeAmount: number;
  tuitionInfo: TuitionInfo;
  financialAid: FinancialAid;
  netPriceByIncome: NetPriceByIncome;
}

interface CollegeInfo {
  schoolSetting: string;
  schoolTypeByDesignation: string;
  schoolTypeByYears: number | null;
  schoolSize: number | null;
  graduationRate: number;
  religiousAffiliation: string | null;
  vocationalSchool: boolean;
}

interface AdmissionsInfo {
  acceptanceRate: number;
  applicantInformation: ApplicantInformation;
  applicationInformation: ApplicationInformation;
  apScoreInformation: ApScoreInformation;
}

interface HousingInfo {
  firstYearCollegeHousingPercent: number;
  averageHousingCostForCampusLife: number;
  housingOptions: HousingOption[];
}

interface UrlInfo {
  vanityUri: string;
  redirectUris: string[];
  schoolUrl: string;
  virtualTourVideoUrl: string;
}

export interface College {
  orgId: string;
  name: string;
  languages: string[];
  history: string;
  funding: string;
  description: string | null;
  accreditations: string[];
  satOrAct: string;
  ipedsId: string;
  locationInfo: LocationInfo;
  collegeInfo: CollegeInfo;
  satScores: SatScores;
  satCompositeScores: SatCompositeScores;
  actScores: ActScores;
  schoolSpecialization: SchoolSpecialization;
  financialInfo: FinancialInfo;
  contactInfo: ContactInfo;
  admissionsInfo: AdmissionsInfo;
  urlInfo: UrlInfo;
  socialMedia: SocialMedia;
  collegeMajors: Division[];
  divisions: Division[];
  studyOptions: StudyOption[];
  highSchool: HighSchool;
  studentSports: StudentSport[];
  enrollmentData: EnrollmentData;
  demographics: Demographics;
  studentActivities: StudentActivity[];
  housingInfo: HousingInfo;
  officers: Officer[];
}
