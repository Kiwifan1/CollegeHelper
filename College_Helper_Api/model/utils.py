def decide_schol_type(value):

    ## This function will decide the type of scholarship based on the eligibility criteria
    ## value: dictionary of 1 individual scholarship
    n = 0
    total_schol_types = []

    schol_types = []
    if value["eligibilityCriteria"]["activity"] is not None:
        schol_types.append("Activity")
    if value["isMeritBased"] is not None:
        schol_types.append("Merit")
    if value["isNeedBased"] is not None:
        schol_types.append("Need")
    if value["eligibilityCriteria"]["currentGradeLevel"] is not None:
        schol_types.append("GradeLevel")
    if value["eligibilityCriteria"]["currentSchool"] is not None:
        schol_types.append("School")
    if value["eligibilityCriteria"]["fieldsOfStudy"] is not None:
        schol_types.append("Study")
    if value["eligibilityCriteria"]["locations"] is not None:
        schol_types.append("Location")

    return schol_types


def calc_merit_score(scholarship, student_responses):
    ### This function will calculate the merit score of a scholarship based on the student's responses for applicable scholarships
    ### scholarship: dictionary of 1 individual scholarship
    ### student_responses: dictionary of 1 individual student's responses
    merit_score = 0
    SAT_score = 0
    ACT_score = 0
    i = 0
    if (
        scholarship["eligibilityCriteria"]["academics"] is not None
        and student_responses is not None
    ):
        for val in scholarship["eligibilityCriteria"]["academics"]:

            if val["academicEligibility"] == "Minimum GPA":
                if student_responses["scores"]["GPA"] is not None:
                    if (
                        student_responses["scores"]["GPA"]
                        >= val["academicEligibilityValue"]
                    ):
                        merit_score += (
                            (
                                (
                                    student_responses["scores"]["GPA"]
                                    - val["academicEligibilityValue"]
                                )
                                / student_responses["scores"]["GPA"]
                            )
                            + 1
                        ) ** 2
                        i += 1

            if val["academicEligibility"] == "Minimum Overall SAT":
                if student_responses["scores"]["SAT"] is not None:
                    if (
                        student_responses["scores"]["SAT"]
                        >= val["academicEligibilityValue"]
                    ):
                        SAT_score += (
                            (
                                (
                                    student_responses["scores"]["SAT"]
                                    - val["academicEligibilityValue"]
                                )
                                / student_responses["scores"]["SAT"]
                            )
                            + 1
                        ) ** 2
                        i += 1
                   

            if val["academicEligibility"] == "Minimum ACT":
                if student_responses["scores"]["ACT"] is not None:
                    if (
                        student_responses["scores"]["ACT"]
                        >= val["academicEligibilityValue"]
                    ):
                        ACT_score += (
                            (
                                (
                                    student_responses["scores"]["ACT"]
                                    - val["academicEligibilityValue"]
                                )
                                / student_responses["scores"]["ACT"]
                            )
                            + 1
                        
                        ) ** 2
                        i += 1
                    
    if student_responses["scores"]["ACT"] is not None and student_responses["scores"]["SAT"] is not None:
        merit_score += (SAT_score + ACT_score) / 2
        i -= 1

    if i != 0:
        merit_score = merit_score / i
    
    merit_score = (merit_score/ideal_merit_applicant(scholarship)) * 100

    return merit_score


def parse_income_intervals(interval):
    parsed_intervals = []

    
    if ">" in interval:
        lower_bound = int(interval[1:-1].replace("k", "")) * 1000
        upper_bound = "inf"
       
    else:
        bounds = interval.split("-")
        lower_bound = int(bounds[0].replace("k", ""))
        upper_bound = int(bounds[1].replace("k", ""))
    parsed_intervals.append((lower_bound, upper_bound))
    return parsed_intervals

def calc_need_score(student_responses):
    need_score = 0
    if student_responses["demographics"]["incomeLevel"] is not None:
        intervals = parse_income_intervals(student_responses["demographics"]["incomeLevel"])
        if intervals[-1] == "inf": 
            need_score = 0
        elif intervals[-1] == 110000:
            need_score = 10
        elif intervals[-1] == 75000:
            need_score = 30 
        elif intervals[-1] == 48000:
            need_score = 60
        elif intervals[-1] == 30000:
            need_score = 100
             
    return need_score



def calc_activity_score(scholarship, student_responses):
    ### This function will calculate the activity score of a scholarship based on the student's responses for applicable scholarships
    ### scholarship: dictionary of 1 individual scholarship
    ### student_responses: dictionary of 1 individual student's responses
    activity_score = 0
    if (
        scholarship["eligibilityCriteria"]["activity"] is not None
        and student_responses["demographics"]["demographicInfo"]["interests"]
        is not None
    ):
        for val in scholarship["eligibilityCriteria"]["activity"]:
            if (
                val["activity"]
                in student_responses["demographics"]["demographicInfo"]["interests"]
            ):
                activity_score += 1
    activity_score = activity_score / len(scholarship["eligibilityCriteria"]["activity"])*100
    return activity_score


def calc_grade_level_score(scholarship, student_responses):
    ### This function will calculate the grade level score of a scholarship based on the student's responses for applicable scholarships
    ### scholarship: dictionary of 1 individual scholarship
    ### student_responses: dictionary of 1 individual student's responses
    grade_level_score = 0
    if (
        scholarship["eligibilityCriteria"]["currentGradeLevel"] is not None
        and student_responses["demographics"]["educationLevel"] is not None
    ):
        for val in scholarship["eligibilityCriteria"]["currentGradeLevel"]:

            if val["currentGrade"] == student_responses["demographics"]["educationLevel"]:
                grade_level_score += 1
    return grade_level_score


def calc_school_score(scholarship, student_responses):
    ### This function will calculate the school score of a scholarship based on the student's responses for applicable scholarships
    ### scholarship: dictionary of 1 individual scholarship
    ### student_responses: dictionary of 1 individual student's responses
    school_score = 0
    if (
        scholarship["eligibilityCriteria"]["currentSchool"] is not None
        and student_responses["collegePreferences"] is not None
    ):
        for val in scholarship["eligibilityCriteria"]["currentSchool"]:
            try:
                for vals in val["school"]:
                    if vals["schoolName"] in student_responses["collegePreferences"]:
                        school_score += 1
            except:
                pass
    school_score = school_score / len(scholarship["eligibilityCriteria"]["currentSchool"])*100
    return school_score


def calc_study_score(scholarship, student_responses):
    ### This function will calculate the study score of a scholarship based on the student's responses for applicable scholarships
    ### scholarship: dictionary of 1 individual scholarship
    ### student_responses: dictionary of 1 individual student's responses
    study_score = 0
    if (
        scholarship["eligibilityCriteria"]["fieldsOfStudy"] is not None
        and student_responses["majorPreferences"] is not None
    ):
        for val in scholarship["eligibilityCriteria"]["fieldsOfStudy"]:
            if val["fieldName"] in student_responses["majorPreferences"]:
                study_score += 1
    study_score = study_score / len(scholarship["eligibilityCriteria"]["fieldsOfStudy"])*100
    return study_score


def calc_location_score(scholarship, student_responses):
    ### This function will calculate the location score of a scholarship based on the student's responses for applicable scholarships
    ### scholarship: dictionary of 1 individual scholarship
    ### student_responses: dictionary of 1 individual student's responses
    location_score = 0
    if (
        scholarship["eligibilityCriteria"]["locations"] is not None
        and student_responses["address"] is not None
    ):
        for val in scholarship["eligibilityCriteria"]["locations"]:
    
            if val.keys() == "country":
                if val['country'] == student_responses['address']['country']:
                    return 0
            
            if val.keys() == "state":
                if val['state'] == student_responses['address']['province']:
                    return 0
            
            if val.keys() == "city":
                if val['city'] == student_responses['address']['city']:
                    return 0
            
            return 1
    return location_score


def aggrigate_values(scholarship, student_responses):
    ## This function will take in a scholarship and a student's responses and return a score for the scholarship
    ## scholarship: dictionary of 1 individual scholarship
    ## student_responses: dictionary of 1 individual student's responses
    schol_types = decide_schol_type(scholarship)
    score = 0
    i = 0
    if scholarship["isMeritBased"] == True and scholarship["eligibilityCriteria"]["academics"] is not None:
        score += 2*(calc_merit_score(scholarship, student_responses))
        i += 1
   
    if "Need" in schol_types:   
        score += calc_need_score(student_responses)
        i += 1
    
    if scholarship["eligibilityCriteria"]["activity"] is not None:
        score += calc_activity_score(scholarship, student_responses)
        i += 1
    if scholarship["eligibilityCriteria"]["currentSchool"] is not None:
        score += calc_school_score(scholarship, student_responses)
        i += 1
    if scholarship["eligibilityCriteria"]["fieldsOfStudy"] is not None:
        score += calc_study_score(scholarship, student_responses)
        i += 1
    if i != 0:
        score = score / i
    return score


def calc_expected_value(scholarship, student_responses):
    ## This function will take in a scholarship and a student's responses and return an expected value for the scholarship
    ## scholarship: dictionary of 1 individual scholarship
    ## student_responses: dictionary of 1 individual student's responses
    
    score = aggrigate_values(scholarship, student_responses)
    ideal = calculate_ideal_applicant(scholarship)
    score = score / ideal
    award_amount = scholarship["awardMax"]
    
    if award_amount is None:
        expected_value = score * 1000
    else:
        
        expected_value = score * int(award_amount)
    if scholarship["isEssayRequired"] == True:
        expected_value = expected_value / 2
    return expected_value

import heapq

# Define Node class
class Node:
    def __init__(self, user, scholarship, cost):
        self.user = user
        self.scholarship = scholarship
        self.cost = cost
    
    def __lt__(self, other):
        return self.cost < other.cost

# Define a function to calculate similarity
def calculate_similarity(user, scholarship):
    similarity = 0
    
    # Example: comparing user demographics with scholarship eligibility criteria
    if user.demographics and scholarship.eligibilityCriteria:
        for demographic in user.demographics.identities:
            if demographic in scholarship.eligibilityCriteria.demographics:
                similarity += 1
    
    # Other factors can be added for similarity calculation
    
    # Normalize the similarity score
    total_possible_similarity = len(user.demographics.identities)  # Total possible similarities
    normalized_similarity = similarity / total_possible_similarity
    
    return normalized_similarity

# Define heuristic function
def heuristic(user, scholarship):
    # Use the similarity as a heuristic
    return 1 - calculate_similarity(user, scholarship)

# Define function to generate successor nodes
def generate_successors(node):
    # Dummy implementation: generating successors by swapping user and scholarship
    successors = []
    
    # Swap user and scholarship
    successor1 = Node(node.scholarship, node.user, 0)  # Same cost, no additional cost for swapping
    successors.append(successor1)
    
    return successors

# Define function to evaluate cost
def evaluate_cost(current_node, successor_node):
    # Calculate similarity of current node and successor node
    current_similarity = calculate_similarity(current_node.user, current_node.scholarship)
    successor_similarity = calculate_similarity(successor_node.user, successor_node.scholarship)
    
    # Cost is the difference between current node's similarity and successor node's similarity
    cost = current_similarity - successor_similarity
    
    return cost

# Define A* search function
def A_star_search(initial_node, min_similarity):
    # Initialize priority queue with initial node
    frontier = [initial_node]
    heapq.heapify(frontier)
    
    # While priority queue is not empty
    while frontier:
        # Pop node with lowest cost from priority queue
        current_node = heapq.heappop(frontier)
        
        # Check if similarity falls below the threshold
        current_similarity = calculate_similarity(current_node.user, current_node.scholarship)
        if current_similarity < min_similarity:
            return current_node
        
        # Generate successor nodes
        successors = generate_successors(current_node)
        
        # For each successor
        for successor in successors:
            # Calculate cost
            cost = current_node.cost + evaluate_cost(current_node, successor)
            
            # Add successor to priority queue
            successor.cost = cost
            heapq.heappush(frontier, successor)
    
    # If no solution found
    return None

# Main algorithm
# Assuming you have initialized user and scholarship objects


def append_scores(student_responses, scholarships) -> dict:
    ### This function will append the scores of each scholarship and the name of the scholarship to a new pandas dataframe
    ### scholarships: list of dictionaries of all scholarships
    ### student_responses: dictionary of 1 student response
    scores = []
    
    for scholarship in scholarships:
        val = calc_expected_value(scholarships[scholarship], student_responses)
        if val > 0:
          scores.append((scholarship.id, val))
    scores = sorted(scores, key=lambda x: x[1], reverse=True)
    return scores

def get_unique_vals(scholarships):
    pass
    

def filter_eligibility(scholarship, student_responses):
    schol_types = decide_schol_type(scholarship)
    
    if "GradeLevel" in schol_types and scholarship["eligibilityCriteria"]["currentGradeLevel"] is not None:
        if (calc_grade_level_score(scholarship, student_responses)) == 0:
            return 0
    
    if "School" in schol_types and scholarship["eligibilityCriteria"]["currentSchool"] is not None:
        if (calc_school_score(scholarship, student_responses)) == 0:
            return 0
    
    if "Study" in schol_types and scholarship["eligibilityCriteria"]["fieldsOfStudy"] is not None:
        if (calc_study_score(scholarship, student_responses)) == 0:
            return 0
    
    if "Location" in schol_types and scholarship["eligibilityCriteria"]["locations"] is not None:
        if (calc_location_score(scholarship, student_responses)) == 0:
            return 0
    
    return 1

def calculate_ideal_applicant(scholarship):
    ## This function will calculate the ideal applicant for a scholarship based on the scholarship's criteria
    ## scholarships: list of dictionaries of all scholarships
    ## student_responses: dictionary of 1 student response
    ideal_applicant = 0 
    i = 0
    
    
        
        
    if  scholarship["isMeritBased"] is not None:
        ideal_applicant += 100
        i = 1
    if  scholarship["isNeedBased"] is not None:
        ideal_applicant += 100
        i += 1
    if scholarship["eligibilityCriteria"]["activity"] is not None:
        ideal_applicant += 100
        i += 1
    if scholarship["eligibilityCriteria"]["currentSchool"] is not None:
        ideal_applicant += len(scholarship["eligibilityCriteria"]["currentSchool"])
        i += 1
    if scholarship["eligibilityCriteria"]["fieldsOfStudy"] is not None:
        ideal_applicant += len(scholarship["eligibilityCriteria"]["fieldsOfStudy"])
        i += 1
        
            
    if i != 0:
        ideal_applicant = ideal_applicant / i
    return ideal_applicant


def ideal_merit_applicant(scholarship):
    merit_score = 0
    SAT_score = 0
    ACT_score = 0
    i = 0
    if scholarship["eligibilityCriteria"]["academics"] is not None:
        for val in scholarship["eligibilityCriteria"]["academics"]:

            if val["academicEligibility"] == "Minimum GPA":
                merit_score += (((4 - val["academicEligibilityValue"])/ 4) + 1) ** 2
                i += 1
            if val["academicEligibility"] == "Minimum Overall SAT":
                SAT_score += (((1600 - val["academicEligibilityValue"])/ 1600) + 1) ** 2
                i += 1
            if val["academicEligibility"] == "Minimum ACT":
                ACT_score += (((36 - val["academicEligibilityValue"])/ 36) + 1) ** 2
                i += 1
        
        if student_responses["scores"]["ACT"] is not None and student_responses["scores"]["SAT"] is not None:
            merit_score += ((SAT_score + ACT_score) / 2)
            i -= 1

        if i != 0:
            merit_score = merit_score / i
        
    
    
    return merit_score


# Sample student json response following given schema
student_responses = {
    "id": "123456789",
    "username": "student123",
    "email": "student123@example.com",
    "password": "hashedpassword123",
    "salt": "somesaltvalue",
    "address": {
        "street": "123 Main St",
        "city": "Springfield",
        "province": "State",
        "postCode": "12345",
        "country": "USA",
        "website": "www.student123.com",
        "latitude": 40.7128,
        "longitude": -74.0060,
    },
    "demographics": {
        "age": 20,
        "demographicInfo": {
            "identities": {
                "nationality": ["American"],
                "genderIdentity": ["Male"],
                "sexualOrientation": ["Heterosexual"],
                "ethnicity": ["Caucasian"],
            },
            "citizenships": ["USA"],
            "degreeSeeking": ["Undergraduate"],
            "fieldsOfStudy": ["Computer Science", "Mathematics"],
            "interests": ["Programming", "Reading", "Hiking", "Basketball", "Sports"],
            "miscellaneousCriteria": ["First-generation college student"],
        },
        "educationLevel": "High School Senior",
        "occupation": "Student",
        "incomeLevel": "null",
        "maritalStatus": "Single",
    },
    "scores": {
        "SAT": 1350,
        "ACT": 30,
        "GPA": 3.8,
        "AP": ["Computer Science A", "Calculus BC"],
        "IB": "null",
        "PSAT10": 1200,
        "NMSQT": "null",
    },
    "collegePreferences": [
        "Stanford University",
        "Massachusetts Institute of Technology",
    ],
    "majorPreferences": ["Computer Science", "Mathematics"],
    "careerPreferences": ["Software Engineer", "Data Scientist"],
    "currentCourses": ["Introduction to Computer Science", "Calculus I"],
}

new_student_responses = {
    "id": "32187a28-088a-408f-afa4-82351a0a3811",
    "username": "kiwi",
    "email": "asc.zx@asdf",
    "salt": "$2b$12$egTGa4HfhfN6BMRRnZdHlO",
    "demographics": {
        "age": 23,
        "demographicInfo": {
            "citizenships": [
                "U.S. Citizen"
            ],
            "identities": {
                "ethnicity": [
                    "Caucasian"
                ],
                "nationality": [
                    "Navajo"
                ],
                "genderIdentity": [
                    "Male"
                ],
                "sexualOrientation": [
                    "Heterosexual"
                ]
            },
            "fieldsOfStudy": [
                ""
            ],
            "interests": [
                {
                    "interestCriteria": "",
                    "interestOther": ""
                }
            ],
            "miscellaneousCriteria": [],
            "degreeSeeking": []
        },
        "educationLevel": "High School Sophomore",
        "occupation": "Employed",
        "incomeLevel": ">110k",
        "maritalStatus": "Prefer not to say"
    },
    "scores": {
        "SAT": 1234,
        "ACT": 32,
        "GPA": 3.5,
        "AP": 12,
        "IB": 10,
        "PSAT10": 1234,
        "NMSQT": 1234
    },
    "collegePreferences": [],
    "majorPreferences": [],
    "careerPreferences": [],
    "currentCourses": [],
    "password": "$2b$12$egTGa4HfhfN6BMRRnZdHlO2lr3gjqlazfm1UyNsoUSSjkc4EG/sKq",
    "addresses": [
        {
        "street": "123 Main St",
        "city": "Springfield",
        "province": "State",
        "postCode": "12345",
        "country": "USA",
        "website": "www.student123.com",
        "latitude": 40.7128,
        "longitude": -74.0060,
        }
    ],
    "_rid": "H7sHAMleQGsfAAAAAAAAAA==",
    "_self": "dbs/H7sHAA==/colls/H7sHAMleQGs=/docs/H7sHAMleQGsfAAAAAAAAAA==/",
    "_etag": "\"c900a785-0000-0200-0000-6612d2710000\"",
    "_attachments": "attachments/",
    "_ts": 1712509553
}