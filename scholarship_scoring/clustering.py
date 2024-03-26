import json
import pandas as pd
with open('updated_app_info.json', 'r') as data:
    scholarships = json.load(data)
    
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
    merit_score = 0
    if scholarship['eligibilityCriteria']['academics'] is not None and student_responses is not None:
        for val in scholarship['eligibilityCriteria']['academics']:
            if val['academicEligibility'] == 'Minimum GPA':
                if student_responses['GPA'] >= val['academicEligibilityValue']:
                    merit_score += (((student_responses['GPA'] - val['academicEligibilityValue'])/student_responses['GPA'])+1)**2
                else:
                    merit_score += 0
            if val['academicEligibility'] == 'Minimum Overall SAT':
                if student_responses['SAT'] >= val['academicEligibilityValue']:
                    merit_score += (((student_responses['SAT'] - val['academicEligibilityValue'])/student_responses['SAT'])+1)**2
                else:
                    merit_score += 0
            if val['academicEligibility'] == 'Minimum ACT':
                if student_responses['ACT'] >= val['academicEligibilityValue']:
                    merit_score += (((student_responses['ACT'] - val['academicEligibilityValue'])/student_responses['ACT'])+1)**2
                else:
                    merit_score += 0
            
    return merit_score



def calc_need_score(student_responses):
    need_score = 0
    if student_responses['need'] is not None:
        need_score += ((student_responses['need']/10)+1)**2           
    
    return need_score

def calc_activity_score(scholarship, student_responses):
    activity_score = 0
    if scholarship['eligibilityCriteria']['activity'] is not None and student_responses['activities'] is not None:
        for val in scholarship['eligibilityCriteria']['activity']:
            if val in student_responses['activities']:
                activity_score += 1
    return activity_score

def calc_grade_level_score(scholarship, student_responses):
    grade_level_score = 0
    if scholarship['eligibilityCriteria']['currentGradeLevel'] is not None and student_responses['grade_level'] is not None:
        for val in scholarship['eligibilityCriteria']['currentGradeLevel']:
            if val == student_responses['grade_level']:
                grade_level_score += 1
    return grade_level_score

def calc_school_score(scholarship, student_responses):
    school_score = 0
    if scholarship['eligibilityCriteria']['currentSchool'] is not None and student_responses['school'] is not None:
        for val in scholarship['eligibilityCriteria']['currentSchool']:
            if val == student_responses['school']:
                school_score += 1
    return school_score

def calc_study_score(scholarship, student_responses):
    study_score = 0
    if scholarship['eligibilityCriteria']['fieldsOfStudy'] is not None and student_responses['study'] is not None:
        for val in scholarship['eligibilityCriteria']['fieldsOfStudy']:
            if val == student_responses['study']:
                study_score += 1
    return study_score

def calc_location_score(scholarship, student_responses):
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
    if "Need" in schol_types:   
        score += calc_need_score(student_responses)
        i += 1
    if scholarship['eligibilityCriteria']['activity'] is not None:
        score += calc_activity_score(scholarship, student_responses)
        i += 1
    if scholarship['eligibilityCriteria']['currentGradeLevel'] is not None:
        score += calc_grade_level_score(scholarship, student_responses)
        i += 1
    if scholarship['eligibilityCriteria']['currentSchool'] is not None:
        score += calc_school_score(scholarship, student_responses)
        i += 1
    if scholarship['eligibilityCriteria']['fieldsOfStudy'] is not None:
        score += calc_study_score(scholarship, student_responses)
        i += 1
    if scholarship['eligibilityCriteria']['locations'] is not None:
        score += calc_location_score(scholarship, student_responses)
        i += 1
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


test_scholarship = scholarships["15-to-finish-scholarship"]
student_responses = {'GPA': 3.5, 'SAT': 1200, 'ACT': 25, 'need': 5, 'activities': ['volleyball', 'band'], 'grade_level': 'Freshman', 'school': 'University of Iowa', 'study': 'Computer Science', 'location': 'Iowa'}
print(aggrigate_values(test_scholarship, student_responses))
print(calc_expected_value(test_scholarship, student_responses))
scores = []
schol_names = []
for scholarship in scholarships:
    scores.append(calc_expected_value(scholarships[scholarship], student_responses))
    schol_names.append(scholarship)
    
    
df = pd.DataFrame({'Scholarship': schol_names, 'Expected Value': scores})

df = df.sort_values(by='Expected Value', ascending=False, ignore_index=True)

print(df)


for i in range(0, 10):
    print(df['Scholarship'][i])
    print(df['Expected Value'][i])
    
#sorted_schol_list = sorted(schol_list)

#print(sorted_schol_list)
def filter_eligability(scholarship, student_responses):
   
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
       if(calc_location_score(scholarship, student_responses))
            return 0