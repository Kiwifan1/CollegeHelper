class Address:
    def __init__(
        self,
        street=None,
        city=None,
        province=None,
        postCode=None,
        country=None,
        website=None,
        latitude=None,
        longitude=None,
    ):
        self.street = street
        self.city = city
        self.province = province
        self.postCode = postCode
        self.country = country
        self.website = website
        self.latitude = latitude
        self.longitude = longitude


class Scores:
    def __init__(
        self, SAT=None, ACT=None, GPA=None, AP=None, IB=None, PSAT10=None, NMSQT=None
    ):
        self.SAT = SAT
        self.ACT = ACT
        self.GPA = GPA
        self.AP = AP
        self.IB = IB
        self.PSAT10 = PSAT10
        self.NMSQT = NMSQT


class UserDemographics:
    def __init__(
        self,
        age=None,
        demographicInfo=None,
        educationLevel=None,
        occupation=None,
        incomeLevel=None,
        maritalStatus=None,
    ):
        self.age = age
        self.demographicInfo = demographicInfo
        self.educationLevel = educationLevel
        self.occupation = occupation
        self.incomeLevel = incomeLevel
        self.maritalStatus = maritalStatus


class Interest:
    def __init__(self, interestCriteria=None, interestOther=None):
        self.interestCriteria = interestCriteria
        self.interestOther = interestOther


class DemographicIdentities:
    def __init__(
        self,
        nationality=None,
        ethnicity=None,
        genderIdentity=None,
        sexualOrientation=None,
    ):
        self.nationality = nationality
        self.ethnicity = ethnicity
        self.genderIdentity = genderIdentity
        self.sexualOrientation = sexualOrientation


class DemographicInfo:
    def __init__(
        self,
        identities=None,
        citizenships=None,
        degreeSeeking=None,
        fieldsOfStudy=None,
        interests=None,
        miscellaneousCriteria=None,
    ):
        self.identities = identities
        self.citizenships = citizenships
        self.degreeSeeking = degreeSeeking
        self.fieldsOfStudy = fieldsOfStudy
        self.interests = interests
        self.miscellaneousCriteria = miscellaneousCriteria


class User:
    def __init__(
        self,
        id=None,
        username=None,
        email=None,
        password=None,
        salt=None,
        addresses=None,
        demographics=None,
        scores=None,
        collegePreferences=None,
        majorPreferences=None,
        careerPreferences=None,
        currentCourses=None,
        scholarshipScores=None,
    ):
        self.id = id
        self.username = username
        self.email = email
        self.password = password
        self.salt = salt
        self.addresses = addresses
        self.demographics = demographics
        self.scores = scores
        self.collegePreferences = collegePreferences
        self.majorPreferences = majorPreferences
        self.careerPreferences = careerPreferences
        self.currentCourses = currentCourses
        self.scholarshipScores = scholarshipScores
