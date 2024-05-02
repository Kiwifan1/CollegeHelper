def decide_schol_type(value):

    ## This function will decide the type of scholarship based on the eligibility criteria
    ## value: dictionary of 1 individual scholarship
    ## returns: list of strings of the scholarship types
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
    ### returns: int - merit score
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

    if (
        student_responses["scores"]["ACT"] is not None
        and student_responses["scores"]["SAT"] is not None
    ):
        merit_score += (SAT_score + ACT_score) / 2
        i -= 1

    if i != 0:
        merit_score = merit_score / i

    ideal = ideal_merit_applicant(scholarship)
    if ideal == 0:
        merit_score = 0
    else:
        merit_score = (merit_score / ideal) * 100

    return merit_score


def parse_income_intervals(interval):
    ### This function will parse the income intervals and return a list of tuples with the lower and upper bounds
    ### interval: string of the income interval given in user dict
    ### returns: Tuple with the lower and upper bounds
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
    ### This function will calculate the need score of a scholarship based on the student's responses for applicable scholarships
    ### student_responses: dictionary of 1 individual student's responses
    ### returns: int - need score
    need_score = 0
    if student_responses["demographics"]["incomeLevel"] is not None:
        intervals = parse_income_intervals(
            student_responses["demographics"]["incomeLevel"]
        )
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
    ### returns: int - activity score
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
    activity_score = (
        activity_score / len(scholarship["eligibilityCriteria"]["activity"]) * 100
    )
    return activity_score


def calc_grade_level_score(scholarship, student_responses):
    ### This function will calculate the grade level score of a scholarship based on the student's responses for applicable scholarships
    ### scholarship: dictionary of 1 individual scholarship
    ### student_responses: dictionary of 1 individual student's responses
    ### returns: int - grade level score
    grade_level_score = 0
    if (
        scholarship["eligibilityCriteria"]["currentGradeLevel"] is not None
        and student_responses["demographics"]["educationLevel"] is not None
    ):
        for val in scholarship["eligibilityCriteria"]["currentGradeLevel"]:

            if (
                val["currentGrade"]
                == student_responses["demographics"]["educationLevel"]
            ):
                grade_level_score += 1
    return grade_level_score


def calc_school_score(scholarship, student_responses):
    ### This function will calculate the school score of a scholarship based on the student's responses for applicable scholarships
    ### scholarship: dictionary of 1 individual scholarship
    ### student_responses: dictionary of 1 individual student's responses
    ### returns: int - school score
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
    school_score = (
        school_score / len(scholarship["eligibilityCriteria"]["currentSchool"]) * 100
    )
    return school_score


def calc_study_score(scholarship, student_responses):
    ### This function will calculate the study score of a scholarship based on the student's responses for applicable scholarships
    ### scholarship: dictionary of 1 individual scholarship
    ### student_responses: dictionary of 1 individual student's responses
    ### returns: int - study score
    study_score = 0
    if (
        scholarship["eligibilityCriteria"]["fieldsOfStudy"] is not None
        and student_responses["majorPreferences"] is not None
    ):
        for val in scholarship["eligibilityCriteria"]["fieldsOfStudy"]:
            if val["fieldName"] in student_responses["majorPreferences"]:
                study_score += 1
    study_score = (
        study_score / len(scholarship["eligibilityCriteria"]["fieldsOfStudy"]) * 100
    )
    return study_score


def calc_location_score(scholarship, student_responses):
    ### This function will calculate the location score of a scholarship based on the student's responses for applicable scholarships
    ### scholarship: dictionary of 1 individual scholarship
    ### student_responses: dictionary of 1 individual student's responses
    ### returns: int - location score
    location_score = 0
    if (
        scholarship["eligibilityCriteria"]["locations"] is not None
        and student_responses["address"] is not None
    ):
        for val in scholarship["eligibilityCriteria"]["locations"]:

            if val.keys() == "country":
                if val["country"] == student_responses["address"]["country"]:
                    return 0

            if val.keys() == "state":
                if val["state"] == student_responses["address"]["province"]:
                    return 0

            if val.keys() == "city":
                if val["city"] == student_responses["address"]["city"]:
                    return 0

            return 1
    return location_score


def aggrigate_values(scholarship, student_responses):
    ## This function will take in a scholarship and a student's responses and return a score for the scholarship
    ## scholarship: dictionary of 1 individual scholarship
    ## student_responses: dictionary of 1 individual student's responses
    ### returns: int - score
    schol_types = decide_schol_type(scholarship)
    score = 0
    i = 0
    if (
        scholarship["isMeritBased"] == True
        and scholarship["eligibilityCriteria"]["academics"] is not None
    ):
        score += 2 * (calc_merit_score(scholarship, student_responses))
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
    ### returns: int - score
    score = aggrigate_values(scholarship, student_responses)
    ideal = calculate_ideal_applicant(scholarship)
    if ideal == 0:
        score = 0
    else:
        score = score / ideal

    if scholarship["isEssayRequired"] == True:
        score = score / 2
    return score


def append_scores(student_responses, scholarships) -> dict:
    ### This function will append the scores of each scholarship and the name of the scholarship to a new pandas dataframe
    ### scholarships: list of dictionaries of all scholarships
    ### student_responses: dictionary of 1 student response
    ### returns: sorted dictionary of the scholarships and their scores for the student
    scores = []

    for scholarship in scholarships:
        val = calc_expected_value(scholarship, student_responses)

        if (
            val > 0
        ):  # and filter_eligibility(scholarships[scholarship], student_responses) == 1:
            scores.append((scholarship["id"], val))

    # sort the scores first by the score and then by the 'awardMax' if the awardMax isn't none and the score is the same
    scores = sorted(scores, key=lambda x: (x[1], scholarship["awardMax"]), reverse=True)
    return scores


def filter_eligibility(scholarship, student_responses):
    ### This function will filter out scholarships that the student is not eligible for
    ### scholarship: dictionary of 1 individual scholarship
    ### student_responses: dictionary of 1 individual student's responses
    ### returns: int - 0 if the student is not eligible for the scholarship, 1 if they are
    schol_types = decide_schol_type(scholarship)

    if (
        "GradeLevel" in schol_types
        and scholarship["eligibilityCriteria"]["currentGradeLevel"] is not None
    ):
        if (calc_grade_level_score(scholarship, student_responses)) == 0:
            return 0

    if (
        "School" in schol_types
        and scholarship["eligibilityCriteria"]["currentSchool"] is not None
    ):
        if (calc_school_score(scholarship, student_responses)) == 0:
            return 0

    if (
        "Study" in schol_types
        and scholarship["eligibilityCriteria"]["fieldsOfStudy"] is not None
    ):
        if (calc_study_score(scholarship, student_responses)) == 0:
            return 0

    if (
        "Location" in schol_types
        and scholarship["eligibilityCriteria"]["locations"] is not None
    ):
        if (calc_location_score(scholarship, student_responses)) == 0:
            return 0

    return 1


def calculate_ideal_applicant(scholarship):
    ### This function will calculate the ideal applicant for a scholarship based on the scholarship's criteria
    ### scholarships: list of dictionaries of all scholarships
    ### student_responses: dictionary of 1 student response
    ### returns: int - score
    ideal_applicant = 0
    i = 0

    if scholarship["isMeritBased"] is not None:
        ideal_applicant += 100
        i = 1
    if scholarship["isNeedBased"] is not None:
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
    ### This function will calculate the ideal merit applicant for a scholarship based on the scholarship's criteria
    ### scholarships: list of dictionaries of all scholarships
    ### student_responses: dictionary of 1 student response
    ### returns: int - score
    merit_score = 0
    SAT_score = 0
    ACT_score = 0
    i = 0
    if scholarship["eligibilityCriteria"]["academics"] is not None:
        for val in scholarship["eligibilityCriteria"]["academics"]:

            if val["academicEligibility"] == "Minimum GPA":
                merit_score += (((4 - val["academicEligibilityValue"]) / 4) + 1) ** 2
                i += 1
            if val["academicEligibility"] == "Minimum Overall SAT":
                SAT_score += (
                    ((1600 - val["academicEligibilityValue"]) / 1600) + 1
                ) ** 2
                i += 1
            if val["academicEligibility"] == "Minimum ACT":
                ACT_score += (((36 - val["academicEligibilityValue"]) / 36) + 1) ** 2
                i += 1


        if i != 0:
            merit_score = merit_score / i

    return merit_score