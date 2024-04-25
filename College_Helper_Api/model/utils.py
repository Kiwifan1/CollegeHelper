import pandas as pd
import json
from model.model import ScholarshipSVDModel
from munch import DefaultMunch

# from model.Objects.Scholarship import EligibilityCriteria, Scholarship
# from model.Objects.User import Scores, User, UserDemographics

# ## scholarships =
# ##Load in whole scholarship json from database
# ## student_responses =
# ##Load in whole student response from database


# def dict_to_user(user_dict):
#     user = User(
#         id=user_dict.get("id"),
#         username=user_dict.get("username"),
#         email=user_dict.get("email"),
#         password=user_dict.get("password"),
#         salt=user_dict.get("salt"),
#         addresses=Address(**user_dict.get("addresses", {})),
#         demographics=UserDemographics(**user_dict.get("demographics", {})),
#         scores=Scores(**user_dict.get("scores", {})),
#         collegePreferences=user_dict.get("collegePreferences"),
#         majorPreferences=user_dict.get("majorPreferences"),
#         careerPreferences=user_dict.get("careerPreferences"),
#         currentCourses=user_dict.get("currentCourses"),
#         scholarshipScores=user_dict.get("scholarshipScores"),
#     )
#     return user


# def dict_to_scholarship(scholarship_dict):
#     eligibility_criteria = EligibilityCriteria(
#         **scholarship_dict.get("eligibilityCriteria", {})
#     )
#     scholarship = Scholarship(
#         id=scholarship_dict.get("id"),
#         scholarshipName=scholarship_dict.get("scholarshipName"),
#         programOrgName=scholarship_dict.get("programOrgName"),
#         scholarshipStatus=scholarship_dict.get("scholarshipStatus"),
#         scholarshipOpen=scholarship_dict.get("scholarshipOpen"),
#         scholarshipDeadline=scholarship_dict.get("scholarshipDeadline"),
#         aboutPara=scholarship_dict.get("aboutPara"),
#         applicationUrl=scholarship_dict.get("applicationUrl"),
#         programUrl=scholarship_dict.get("programUrl"),
#         eligibilityCriteria=eligibility_criteria,
#         eligibilityCriteriaDescriptions=scholarship_dict.get(
#             "eligibilityCriteriaDescriptions"
#         ),
#         isEssayRequired=scholarship_dict.get("isEssayRequired"),
#         isNeedBased=scholarship_dict.get("isNeedBased"),
#         isMeritBased=scholarship_dict.get("isMeritBased"),
#         cbScholarshipId=scholarship_dict.get("cbScholarshipId"),
#         amountDisplay=scholarship_dict.get("amountDisplay"),
#         applicationFee=scholarship_dict.get("applicationFee"),
#         maxAmountFormat=scholarship_dict.get("maxAmountFormat"),
#         score=scholarship_dict.get("score"),
#         similarityId=scholarship_dict.get("similarityId"),
#         awardMin=scholarship_dict.get("awardMin"),
#         awardMax=scholarship_dict.get("awardMax"),
#     )
#     return scholarship


# Example usage:
# user_dict = {...}  # Dictionary representing a user
# scholarship_dict = {...}  # Dictionary representing a scholarship

# Convert dictionaries to Python objects
# user = dict_to_user(user_dict)
# scholarship = dict_to_scholarship(scholarship_dict)


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
                    else:
                        merit_score += 0

            if val["academicEligibility"] == "Minimum Overall SAT":
                if student_responses["scores"]["SAT"] is not None:
                    if (
                        student_responses["scores"]["SAT"]
                        >= val["academicEligibilityValue"]
                    ):
                        merit_score += (
                            (
                                (
                                    student_responses["scores"]["SAT"]
                                    - val["academicEligibilityValue"]
                                )
                                / student_responses["scores"]["SAT"]
                            )
                            + 1
                        ) ** 2
                    else:
                        merit_score += 0

            if val["academicEligibility"] == "Minimum ACT":
                if student_responses["scores"]["ACT"] is not None:
                    if (
                        student_responses["scores"]["ACT"]
                        >= val["academicEligibilityValue"]
                    ):
                        merit_score += (
                            (
                                (
                                    student_responses["scores"]["ACT"]
                                    - val["academicEligibilityValue"]
                                )
                                / student_responses["scores"]["ACT"]
                            )
                            + 1
                        ) ** 2
                    else:
                        merit_score += 0

    return merit_score


"""
def calc_need_score(student_responses):
    need_score = 0
    if student_responses['need'] is not None:
        need_score += ((student_responses['need']/10)+1)**2           
    
    return need_score
"""


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
    return activity_score


def calc_grade_level_score(scholarship, student_responses):
    ### This function will calculate the grade level score of a scholarship based on the student's responses for applicable scholarships
    ### scholarship: dictionary of 1 individual scholarship
    ### student_responses: dictionary of 1 individual student's responses
    grade_level_score = 0
    if (
        scholarship["eligibilityCriteria"]["currentGradeLevel"] is not None
        and student_responses["grade_level"] is not None
    ):
        for val in scholarship["eligibilityCriteria"]["currentGradeLevel"]:
            if val == student_responses["grade_level"]:
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

    return study_score


def calc_location_score(scholarship, student_responses):
    ### This function will calculate the location score of a scholarship based on the student's responses for applicable scholarships
    ### scholarship: dictionary of 1 individual scholarship
    ### student_responses: dictionary of 1 individual student's responses
    location_score = 0
    if (
        scholarship["eligibilityCriteria"]["locations"] is not None
        and student_responses["location"] is not None
    ):
        for val in scholarship["eligibilityCriteria"]["locations"]:
            if val == student_responses["location"]:
                location_score += 1
    return location_score


def aggrigate_values(scholarship, student_responses):
    ## This function will take in a scholarship and a student's responses and return a score for the scholarship
    ## scholarship: dictionary of 1 individual scholarship
    ## student_responses: dictionary of 1 individual student's responses
    schol_types = decide_schol_type(scholarship)
    score = 0
    i = 0
    if "Merit" in schol_types:
        score += calc_merit_score(scholarship, student_responses)
        i += 1
    """
    if "Need" in schol_types:   
        score += calc_need_score(student_responses)
        i += 1
    """
    if scholarship["eligibilityCriteria"]["activity"] is not None:
        score += calc_activity_score(scholarship, student_responses)
        i += 1
    """   
    if scholarship['eligibilityCriteria']['currentGradeLevel'] is not None:
        score += calc_grade_level_score(scholarship, student_responses)
        i += 1
    """
    if scholarship["eligibilityCriteria"]["currentSchool"] is not None:
        score += calc_school_score(scholarship, student_responses)
        i += 1
    if scholarship["eligibilityCriteria"]["fieldsOfStudy"] is not None:
        score += calc_study_score(scholarship, student_responses)
        i += 1
    """
    if scholarship['eligibilityCriteria']['locations'] is not None:
        score += calc_location_score(scholarship, student_responses)
        i += 1
        
    """
    if i != 0:
        score = score / i
    return score


def calc_expected_value(scholarship, student_responses):
    ## This function will take in a scholarship and a student's responses and return an expected value for the scholarship
    ## scholarship: dictionary of 1 individual scholarship
    ## student_responses: dictionary of 1 individual student's responses
    score = aggrigate_values(scholarship, student_responses)
    award_amount = scholarship["awardMax"]
    if award_amount is None:
        expected_value = score * 1000
    else:
        expected_value = score * award_amount
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



def append_scores(student_responses, scholarships) -> list[tuple[str, float]]:
    """Given a student's responses and a list of scholarships, return a list of tuples containing the scholarship id and the student's score for that scholarship, sorted by score in descending order.

    Args:
        student_responses (dict): A dictionary containing the student's responses.
        scholarships (list): A list of dictionaries, each containing information about a scholarship.

    Returns:
        list[tuple[str, float]]: A list of tuples containing the scholarship id and the student's score for that scholarship, sorted by score in descending order.
    """

    scores = []

    # for scholarship in scholarships:
    #     val = calc_expected_value(scholarship, student_responses)
    #     if val > 0:
    #         scores.append((scholarship["id"], val))

    # scores = sorted(scores, key=lambda x: x[1], reverse=True)
    # # normalize scores
    # max_score = scores[0][1]
    # min_score = scores[-1][1]
    # for i in range(len(scores)):
    #     scores[i] = (scores[i][0], (scores[i][1] - min_score) / (max_score - min_score))
    min_similarity = 0.2  # Set the minimum similarity threshold
    user = DefaultMunch.fromDict(student_responses)
    for schol in scholarships:
        initial_node = Node(user, schol, 0)
        scholarship = DefaultMunch.fromDict(schol)
        solution = A_star_search(initial_node, min_similarity)
        if solution:
            scores.append((scholarship.id, calculate_similarity(user, scholarship)))
        # score = ScholarshipSVDModel(user, scholarship).predict_likelihood()
        # scores.append((scholarship.id, score))

    scores = sorted(scores, key=lambda x: x[1], reverse=True)

    return scores

def get_unique_vals(scholarships):
    pass
    

def filter_eligibility(scholarship, student_responses):

    if scholarship["eligibilityCriteria"]["currentGradeLevel"] is not None:
        if (calc_grade_level_score(scholarship, student_responses)) == 0:
            return 0

    if scholarship["eligibilityCriteria"]["currentSchool"] is not None:
        if (calc_school_score(scholarship, student_responses)) == 0:
            return 0
    if scholarship["eligibilityCriteria"]["fieldsOfStudy"] is not None:
        if (calc_study_score(scholarship, student_responses)) == 0:
            return 0
    if scholarship["eligibilityCriteria"]["locations"] is not None:
        if (calc_location_score(scholarship, student_responses)) == 0:
            return 0


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
        "educationLevel": "High School Graduate",
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
