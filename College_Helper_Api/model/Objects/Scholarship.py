from typing import List, Optional


class EligibilityCriteria:
    def __init__(
        self,
        miscellaneous: Optional[List["MiscellaneousCriteria"]] = None,
        activity: Optional[List["Activity"]] = None,
        currentGradeLevel: Optional[List["CurrentGradeLevel"]] = None,
        collegeReadinessProgramParticipation: Optional[bool] = None,
        currentSchool: Optional[List["CurrentSchool"]] = None,
        affiliation: Optional[List["Affiliation"]] = None,
        graduation: Optional[bool] = None,
        armedServices: Optional[List["ArmedServices"]] = None,
        situation: Optional[List["Situation"]] = None,
        profession: Optional[bool] = None,
        financialInformation: Optional[bool] = None,
        applicationRestriction: Optional[bool] = None,
        collegeAttendanceCriteria: Optional[bool] = None,
        academics: Optional[List["ScholarshipAcademics"]] = None,
        degreeSeeking: Optional[List[str]] = None,
        condition: Optional[bool] = None,
        fieldsOfStudy: Optional[List["FieldsOfStudy"]] = None,
        enrollmentStatus: Optional[List[str]] = None,
        citizenshipStatuses: Optional[List[str]] = None,
        graduationStatuses: Optional[bool] = None,
        locations: Optional[List["Location"]] = None,
        interests: Optional[List["Interest"]] = None,
        studyAbroad: Optional[bool] = None,
        age: Optional[bool] = None,
        demographics: Optional[List[str]] = None,
    ):
        self.miscellaneous = miscellaneous
        self.activity = activity
        self.currentGradeLevel = currentGradeLevel
        self.collegeReadinessProgramParticipation = collegeReadinessProgramParticipation
        self.currentSchool = currentSchool
        self.affiliation = affiliation
        self.graduation = graduation
        self.armedServices = armedServices
        self.situation = situation
        self.profession = profession
        self.financialInformation = financialInformation
        self.applicationRestriction = applicationRestriction
        self.collegeAttendanceCriteria = collegeAttendanceCriteria
        self.academics = academics
        self.degreeSeeking = degreeSeeking
        self.condition = condition
        self.fieldsOfStudy = fieldsOfStudy
        self.enrollmentStatus = enrollmentStatus
        self.citizenshipStatuses = citizenshipStatuses
        self.graduationStatuses = graduationStatuses
        self.locations = locations
        self.interests = interests
        self.studyAbroad = studyAbroad
        self.age = age
        self.demographics = demographics


class MiscellaneousCriteria:
    def __init__(self, miscellaneousCriteria: str):
        self.miscellaneousCriteria = miscellaneousCriteria


class Activity:
    def __init__(self, activity: str, activityOther: Optional[str] = None):
        self.activity = activity
        self.activityOther = activityOther


class CurrentGradeLevel:
    def __init__(self, currentGrade: str):
        self.currentGrade = currentGrade


class CurrentSchool:
    def __init__(self, school: List["School"]):
        self.school = school


class School:
    def __init__(
        self,
        ceebCode: str,
        schoolType: str,
        ncesCode: str,
        schoolAddress: "SchoolAddress",
        schoolName: str,
    ):
        self.ceebCode = ceebCode
        self.schoolType = schoolType
        self.ncesCode = ncesCode
        self.schoolAddress = schoolAddress
        self.schoolName = schoolName


class SchoolAddress:
    def __init__(
        self, stateOrProvince: str, city: str, addressLine1: str, zipOrPostalCode: str
    ):
        self.stateOrProvince = stateOrProvince
        self.city = city
        self.addressLine1 = addressLine1
        self.zipOrPostalCode = zipOrPostalCode


class Affiliation:
    def __init__(
        self,
        affiliationEntity: str,
        directRelation: str,
        affiliationEntityOther: Optional[str] = None,
        indirectRelation: Optional[str] = None,
    ):
        self.affiliationEntity = affiliationEntity
        self.directRelation = directRelation
        self.affiliationEntityOther = affiliationEntityOther
        self.indirectRelation = indirectRelation


class ArmedServices:
    def __init__(
        self,
        armedServiceStatus: str,
        armedServiceBranch: Optional[str] = None,
        armedServiceRelation: Optional[str] = None,
    ):
        self.armedServiceStatus = armedServiceStatus
        self.armedServiceBranch = armedServiceBranch
        self.armedServiceRelation = armedServiceRelation


class Situation:
    def __init__(self, situation: str, situationOther: Optional[str] = None):
        self.situation = situation
        self.situationOther = situationOther


class ScholarshipAcademics:
    def __init__(self, academicEligibility: str, academicEligibilityValue: int):
        self.academicEligibility = academicEligibility
        self.academicEligibilityValue = academicEligibilityValue


class FieldsOfStudy:
    def __init__(self, fieldName: str, cipCode: Optional[str] = None):
        self.fieldName = fieldName
        self.cipCode = cipCode


class Location:
    def __init__(self, country: str, state: Optional[str] = None):
        self.country = country
        self.state = state


class Interest:
    def __init__(self, interestCriteria: str, interestOther: Optional[str] = None):
        self.interestCriteria = interestCriteria
        self.interestOther = interestOther


class Scholarship:
    def __init__(
        self,
        id: str,
        scholarshipName: str,
        programOrgName: str,
        scholarshipStatus: str,
        scholarshipOpen: str,
        scholarshipDeadline: str,
        aboutPara: str,
        applicationUrl: str,
        programUrl: str,
        eligibilityCriteria: EligibilityCriteria,
        eligibilityCriteriaDescriptions: List[str],
        isEssayRequired: bool,
        isNeedBased: bool,
        isMeritBased: bool,
        cbScholarshipId: str,
        amountDisplay: Optional[str] = None,
        applicationFee: Optional[int] = None,
        maxAmountFormat: Optional[str] = None,
        score: Optional[int] = None,
        similarityId: Optional[str] = None,
        awardMin: Optional[int] = None,
        awardMax: Optional[int] = None,
    ):
        self.id = id
        self.scholarshipName = scholarshipName
        self.programOrgName = programOrgName
        self.scholarshipStatus = scholarshipStatus
        self.scholarshipOpen = scholarshipOpen
        self.scholarshipDeadline = scholarshipDeadline
        self.aboutPara = aboutPara
        self.amountDisplay = amountDisplay
        self.applicationUrl = applicationUrl
        self.programUrl = programUrl
        self.applicationFee = applicationFee
        self.eligibilityCriteria = eligibilityCriteria
        self.maxAmountFormat = maxAmountFormat
        self.eligibilityCriteriaDescriptions = eligibilityCriteriaDescriptions
        self.isEssayRequired = isEssayRequired
        self.isNeedBased = isNeedBased
        self.isMeritBased = isMeritBased
        self.cbScholarshipId = cbScholarshipId
        self.score = score
        self.similarityId = similarityId
        self.awardMin = awardMin
        self.awardMax = awardMax
