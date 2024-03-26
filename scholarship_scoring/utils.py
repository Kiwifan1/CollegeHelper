
import pandas as pd
import json
## scholarships =
##Load in whole scholarship json from database
## student_responses = 
##Load in whole student response from database

def decide_schol_type(value):
    
    ## This function will decide the type of scholarship based on the eligibility criteria
    ## value: dictionary of 1 individual scholarship
    n = 0
    total_schol_types = []
    
    schol_types = []
    if value['eligibilityCriteria']['activity'] is not None:
        schol_types.append('Activity')
    if value['isMeritBased'] is not None:
        schol_types.append('Merit')
    if value['isNeedBased'] is not None:
        schol_types.append('Need')
    if value['eligibilityCriteria']['currentGradeLevel'] is not None:
        schol_types.append('GradeLevel')
    if value['eligibilityCriteria']['currentSchool'] is not None:
        schol_types.append('School')
    if value['eligibilityCriteria']['fieldsOfStudy'] is not None:
        schol_types.append('Study')
    if value['eligibilityCriteria']['locations'] is not None:
        schol_types.append('Location')
    
    return schol_types


def calc_merit_score(scholarship, student_responses):
    ### This function will calculate the merit score of a scholarship based on the student's responses for applicable scholarships
    ### scholarship: dictionary of 1 individual scholarship
    ### student_responses: dictionary of 1 individual student's responses
    merit_score = 0
    if scholarship['eligibilityCriteria']['academics'] is not None and student_responses is not None:
        for val in scholarship['eligibilityCriteria']['academics']:
            
            if val['academicEligibility'] == 'Minimum GPA':
                if student_responses['scores']['GPA'] is not None:
                    if student_responses['scores']['GPA'] >= val['academicEligibilityValue']:
                        merit_score += (((student_responses['scores']['GPA'] - val['academicEligibilityValue'])/student_responses['scores']['GPA'])+1)**2
                    else:
                        merit_score += 0
                        
            if val['academicEligibility'] == 'Minimum Overall SAT':
                if student_responses['scores']['SAT'] is not None:
                    if student_responses['scores']['SAT'] >= val['academicEligibilityValue']:
                        merit_score += (((student_responses['scores']['SAT'] - val['academicEligibilityValue'])/student_responses['scores']['SAT'])+1)**2
                    else:
                        merit_score += 0
                        
            if val['academicEligibility'] == 'Minimum ACT':
                if student_responses['scores']['ACT'] is not None:
                    if student_responses['scores']['ACT'] >= val['academicEligibilityValue']:
                        merit_score += (((student_responses['scores']['ACT'] - val['academicEligibilityValue'])/student_responses['scores']['ACT'])+1)**2
                    else:
                        merit_score += 0
            
    return merit_score


'''
def calc_need_score(student_responses):
    need_score = 0
    if student_responses['need'] is not None:
        need_score += ((student_responses['need']/10)+1)**2           
    
    return need_score
'''

def calc_activity_score(scholarship, student_responses):
    ### This function will calculate the activity score of a scholarship based on the student's responses for applicable scholarships
    ### scholarship: dictionary of 1 individual scholarship
    ### student_responses: dictionary of 1 individual student's responses
    activity_score = 0
    if scholarship['eligibilityCriteria']['activity'] is not None and student_responses['demographics']['demographicInfo']['interests'] is not None:
        for val in scholarship['eligibilityCriteria']['activity']:
            if val['activity'] in student_responses['demographics']['demographicInfo']['interests']:
                activity_score += 1
    return activity_score

def calc_grade_level_score(scholarship, student_responses):
    ### This function will calculate the grade level score of a scholarship based on the student's responses for applicable scholarships
    ### scholarship: dictionary of 1 individual scholarship
    ### student_responses: dictionary of 1 individual student's responses
    grade_level_score = 0
    if scholarship['eligibilityCriteria']['currentGradeLevel'] is not None and student_responses['grade_level'] is not None:
        for val in scholarship['eligibilityCriteria']['currentGradeLevel']:
            if val == student_responses['grade_level']:
                grade_level_score += 1
    return grade_level_score

def calc_school_score(scholarship, student_responses):
    ### This function will calculate the school score of a scholarship based on the student's responses for applicable scholarships
    ### scholarship: dictionary of 1 individual scholarship
    ### student_responses: dictionary of 1 individual student's responses
    school_score = 0
    if scholarship['eligibilityCriteria']['currentSchool'] is not None and student_responses['collegePreferences'] is not None:
        for val in scholarship['eligibilityCriteria']['currentSchool']:
            try:
                for vals in val['school']:
                    if vals['schoolName'] in student_responses['collegePreferences']:
                        school_score += 1
            except:
                pass
    return school_score

def calc_study_score(scholarship, student_responses):
    ### This function will calculate the study score of a scholarship based on the student's responses for applicable scholarships
    ### scholarship: dictionary of 1 individual scholarship
    ### student_responses: dictionary of 1 individual student's responses
    study_score = 0
    if scholarship['eligibilityCriteria']['fieldsOfStudy'] is not None and student_responses['majorPreferences'] is not None:
        for val in scholarship['eligibilityCriteria']['fieldsOfStudy']:
            if val['fieldName'] in student_responses['majorPreferences']:
                    study_score += 1
        
    return study_score

def calc_location_score(scholarship, student_responses):
    ### This function will calculate the location score of a scholarship based on the student's responses for applicable scholarships
    ### scholarship: dictionary of 1 individual scholarship
    ### student_responses: dictionary of 1 individual student's responses
    location_score = 0
    if scholarship['eligibilityCriteria']['locations'] is not None and student_responses['location'] is not None:
        for val in scholarship['eligibilityCriteria']['locations']:
            if val == student_responses['location']:
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
        i+=1
    '''
    if "Need" in schol_types:   
        score += calc_need_score(student_responses)
        i += 1
    '''
    if scholarship['eligibilityCriteria']['activity'] is not None:
        score += calc_activity_score(scholarship, student_responses)
        i += 1
    '''   
    if scholarship['eligibilityCriteria']['currentGradeLevel'] is not None:
        score += calc_grade_level_score(scholarship, student_responses)
        i += 1
    '''    
    if scholarship['eligibilityCriteria']['currentSchool'] is not None:
        score += calc_school_score(scholarship, student_responses)
        i += 1
    if scholarship['eligibilityCriteria']['fieldsOfStudy'] is not None:
        score += calc_study_score(scholarship, student_responses)
        i += 1
    '''
    if scholarship['eligibilityCriteria']['locations'] is not None:
        score += calc_location_score(scholarship, student_responses)
        i += 1
        
    '''
    if i != 0:
        score = score/i
    return score


def calc_expected_value(scholarship, student_responses):
    ## This function will take in a scholarship and a student's responses and return an expected value for the scholarship
    ## scholarship: dictionary of 1 individual scholarship
    ## student_responses: dictionary of 1 individual student's responses
    score = aggrigate_values(scholarship, student_responses)
    award_amount = scholarship['amountDisplay']
    try:
        award_amount = int(award_amount.replace(',', ''))
        expected_value = score * award_amount
        
    except:
        expected_value = score * 1000
    if scholarship['isEssayRequired'] == True:
        expected_value = expected_value/2
    return expected_value

def append_scores(student_responses, scholarships) -> dict:
    ### This function will append the scores of each scholarship and the name of the scholarship to a new pandas dataframe
    ### scholarships: dictionary of all scholarships
    ### student_responses: dictionary of 1 student response
    scores = []
    for scholarship in scholarships:
        
        score = {
                    "schol_id": scholarships[scholarship]["id"],
                    "score": calc_expected_value(scholarships[scholarship], student_responses),
                }
        scores.append(score)
        
    scores = sorted(scores, key=lambda x: x["score"], reverse=True)
    val = {"user_id": student_responses["id"], "scores": scores}
    return val
        
    #df = pd.DataFrame({'Scholarship': schol_names, 'Expected Value': scores})

    #df = df.sort_values(by='Expected Value', ascending=False, ignore_index=True)
    



def filter_eligibility(scholarship, student_responses):
   
    if scholarship['eligibilityCriteria']['currentGradeLevel'] is not None:
        if(calc_grade_level_score(scholarship, student_responses)) == 0:
            return 0
        
    if scholarship['eligibilityCriteria']['currentSchool'] is not None:
       if(calc_school_score(scholarship, student_responses)) == 0:
            return 0
    if scholarship['eligibilityCriteria']['fieldsOfStudy'] is not None:
        if(calc_study_score(scholarship, student_responses)) == 0:
            return 0
    if scholarship['eligibilityCriteria']['locations'] is not None:
       if(calc_location_score(scholarship, student_responses)) == 0:
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
    "longitude": -74.0060
  },
  "demographics": {
    "age": 20,
    "demographicInfo": {
      "identities": {
        "nationality": ["American"],
        "genderIdentity": ["Male"],
        "sexualOrientation": ["Heterosexual"],
        "ethnicity": ["Caucasian"]
      },
      "citizenships": ["USA"],
      "degreeSeeking": ["Undergraduate"],
      "fieldsOfStudy": ["Computer Science", "Mathematics"],
      "interests": ["Programming", "Reading", "Hiking", "Basketball", "Sports"],
      "miscellaneousCriteria": ["First-generation college student"]
    },
    "educationLevel": "High School Graduate",
    "occupation": "Student",
    "incomeLevel": 'null',
    "maritalStatus": "Single"
  },
  "scores": {
    "SAT": 1350,
    "ACT": 30,
    "GPA": 3.8,
    "AP": [ "Computer Science A", "Calculus BC" ],
    "IB": 'null',
    "PSAT10": 1200,
    "NMSQT": 'null'
  },
  "collegePreferences": ["Stanford University", "Massachusetts Institute of Technology"],
  "majorPreferences": ["Computer Science", "Mathematics"],
  "careerPreferences": ["Software Engineer", "Data Scientist"],
  "currentCourses": ["Introduction to Computer Science", "Calculus I"]
}