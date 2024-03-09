import { Division } from "./Course";
import { Officer } from "./Officer";

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
}

interface HighSchoolGpa {
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
  financialAidOfficePhoneNumber: string;
}

interface IncomeNetPrice {
  // added
  averageNetPriceBelow30K: number;
  averageNetPrice30To48K: number;
  averageNetPrice48To75K: number;
  averageNetPrice75To110K: number;
  averageNetPriceAbove110K: number;
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
  incomeNetPrice: IncomeNetPrice;
}

interface AdmissionsInfo {
  acceptanceRate: number;
  applicantInformation: ApplicantInformation;
  applicationInformation: ApplicationInformation;
  apScoreInformation: ApScoreInformation;
}

export interface College {
  orgId: string;
  name: string;
  languages: string[];
  history: string;
  funding: string;
  description: string | null;
  locationInfo: LocationInfo;
  schoolSetting: string;
  schoolTypeByDesignation: string;
  schoolTypeByYears: number | null;
  schoolSize: number | null;
  graduationRate: number;
  satOrAct: string;
  satScores: SatScores;
  satCompositeScores: SatCompositeScores;
  actScores: ActScores;
  schoolSpecialization: SchoolSpecialization;
  religiousAffiliation: string | null;
  financialInfo: FinancialInfo;
  contactInfo: ContactInfo;
  admissionsInfo: AdmissionsInfo;
  vocationalSchool: boolean;
  vanityUri: string;
  redirectUris: string[];
  schoolUrl: string;
  virtualTourVideoUrl: string;
  countryCode: string | null;
  ipedsId: string;
  socialMedia: SocialMedia;
  collegeMajors: Division[];
  divisions: Division[];
  studyOptions: StudyOption[];
  highSchoolGpa: HighSchoolGpa;
  highSchoolRank: string;
  prepCourses: string;
  recommendations: string;
  studentSports: StudentSport[];
  enrollmentData: EnrollmentData;
  demographics: Demographics;
  studentActivities: StudentActivity[];
  firstYearCollegeHousingPercent: number;
  averageHousingCostForCampusLife: number;
  housingOptions: HousingOption[];
  needBasedFinAidForIntlStudentsInd: boolean;
  nonNeedBasedFinAidForIntlStudentsInd: boolean;
  applicationsAccepted: string[];
  officers: Officer[];
  accreditations: string[];
}
