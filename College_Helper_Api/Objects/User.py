class User:
    def __init__(self):
        self.username = ''
        self.Email = ''
        self.password = ''
        self.address = Address()
        self.demographics = Demographics()
        self.scores = Scores()
        self.collegePreferences = []
        self.majorPreferences = []
        self.careerPreferences = []
        self.currentCourses = []


class Address:
    def __init__(self):
        self.street = None
        self.city = None
        self.state = None
        self.zip = None
        self.country = None
        self.website = None


class Demographics:
    def __init__(self):
        self.age = None
        self.gender = None
        self.ethnicity = None
        self.educationLevel = None
        self.occupation = None
        self.incomeLevel = None
        self.maritalStatus = None


class Scores:
    def __init__(self):
        self.SAT = None
        self.ACT = None
        self.GPA = None
        self.AP = None
        self.IB = None
        self.PSAT10 = None
        self.NMSQT = None
