import numpy as np
from sklearn.decomposition import TruncatedSVD
from sklearn.preprocessing import OneHotEncoder
from munch import DefaultMunch
import json


class ScholarshipSVDModel:
    def __init__(self, user, scholarship):
        self.user = user
        self.scholarship = scholarship

    def prepare_data(self):
        # Preprocess user data
        user_features = []
        for key, value in self.user.items():
            if isinstance(value, dict):
                for sub_key, sub_value in value.items():
                    if isinstance(sub_value, (list, dict)):
                        continue
                    else:
                        user_features.append(sub_value)
            elif isinstance(value, list):
                continue
            else:
                user_features.append(value)

        # Preprocess scholarship data
        scholarship_features = []
        for key, value in self.scholarship.items():
            if isinstance(value, dict):
                for sub_key, sub_value in value.items():
                    if isinstance(sub_value, (list, dict)):
                        continue
                    else:
                        scholarship_features.append(sub_value)
            elif isinstance(value, list):
                continue
            else:
                scholarship_features.append(value)

        # Encode categorical variables
        categorical_vars = [
            "educationLevel",
            "occupation",
            "incomeLevel",
            "maritalStatus",
            "currentGradeLevel",
        ]
        for var in categorical_vars:
            if var in self.user["demographics"]:
                user_features.append(self.user["demographics"][var])

        return np.array(user_features).reshape(1, -1), np.array(
            scholarship_features
        ).reshape(1, -1)

    def perform_svd(self):
        user_features, scholarship_features = self.prepare_data()

        data_matrix = np.vstack((user_features, scholarship_features))

        svd = TruncatedSVD(n_components=5)  # Increase the number of components
        transformed_data = svd.fit_transform(data_matrix)

        return transformed_data

    def score_likelihood(self, transformed_data):
        user_transformed = transformed_data[0]
        scholarship_transformed = transformed_data[1]

        similarity_score = np.dot(user_transformed, scholarship_transformed.T)

        return similarity_score[0]

    def predict_likelihood(self):
        transformed_data = self.perform_svd()
        likelihood_score = self.score_likelihood(transformed_data)

        return likelihood_score


# JSON objects representing user and scholarship
user_json = """
{
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
  "majorPreferences": [
    null
  ],
  "careerPreferences": [
    null
  ],
  "currentCourses": [],
  "password": "$2b$12$egTGa4HfhfN6BMRRnZdHlO2lr3gjqlazfm1UyNsoUSSjkc4EG/sKq",
  "addresses": [
    {
      "street": "",
      "city": "",
      "province": "",
      "country": "",
      "postCode": ""
    }
  ]
}
"""

scholarship_json = """
{
  "id": "ebfd9d65-465a-4ebe-baba-02f786ea95ee",
  "scholarshipName": "Shell Incentive Fund Scholarship for Undergraduate Students",
  "programOrgName": "Shell Oil Company",
  "scholarshipStatus": "Deadline Soon",
  "scholarshipOpen": "1/20/2024",
  "scholarshipDeadline": "3/16/2024",
  "aboutPara": "The Shell Incentive Fund Scholarship for Undergraduate Students provides financial assistance to underrepresented minority students pursuing postsecondary education in engineering and geosciences fields at designated universities are welcome to apply.",
  "applicationUrl": "https://www.shell.us/careers/about-careers-at-shell/shell-graduate-program/scholarships.html",
  "programUrl": "https://www.shell.us",
  "applicationFee": null,
  "eligibilityCriteria": {
    "miscellaneous": null,
    "activity": null,
    "currentGradeLevel": [
      {
        "currentGrade": "College Freshman"
      },
      {
        "currentGrade": "College Sophomore"
      },
      {
        "currentGrade": "College Junior"
      }
    ],
    "collegeReadinessProgramParticipation": null,
    "currentSchool": [
      {
        "school": [
          {
            "ceebCode": "4073",
            "schoolType": "College",
            "ncesCode": "126775",
            "schoolAddress": {
              "stateOrProvince": "CO",
              "city": "Golden"
            },
            "schoolName": "Colorado School of Mines"
          },
          {
            "ceebCode": "5215",
            "schoolType": "College",
            "ncesCode": "133650",
            "schoolAddress": {
              "stateOrProvince": "FL",
              "city": "Tallahassee"
            },
            "schoolName": "Florida Agricultural and Mechanical University"
          },
          {
            "ceebCode": "5248",
            "schoolType": "College",
            "ncesCode": "139755",
            "schoolAddress": {
              "stateOrProvince": "GA",
              "city": "Atlanta",
              "addressLine1": "North Avenue",
              "zipOrPostalCode": "30332"
            },
            "schoolName": "Georgia Institute Technology"
          },
          {
            "ceebCode": "6373",
            "schoolType": "College",
            "ncesCode": "159391",
            "schoolAddress": {
              "stateOrProvince": "LA",
              "city": "Baton Rouge"
            },
            "schoolName": "Louisiana State University and Agricultural & Mechanical College"
          },
          {
            "ceebCode": "3514",
            "schoolType": "College",
            "ncesCode": "166683",
            "schoolAddress": {
              "stateOrProvince": "MA",
              "city": "Cambridge"
            },
            "schoolName": "Massachusetts Institute of Technology"
          },
          {
            "ceebCode": "5003",
            "schoolType": "College",
            "ncesCode": "199102",
            "schoolAddress": {
              "stateOrProvince": "NC",
              "city": "Greensboro"
            },
            "schoolName": "North Carolina Agricultural Tech State University"
          },
          {
            "ceebCode": "2660",
            "schoolType": "College",
            "ncesCode": "214777",
            "schoolAddress": {
              "stateOrProvince": "PA",
              "city": "University Park"
            },
            "schoolName": "Pennsylvania State University - Penn State University Park"
          },
          {
            "ceebCode": "6580",
            "schoolType": "College",
            "ncesCode": "227526",
            "schoolAddress": {
              "stateOrProvince": "TX",
              "city": "Prairie View"
            },
            "schoolName": "Prairie View A&M University"
          },
          {
            "ceebCode": "6609",
            "schoolType": "College",
            "ncesCode": "227757",
            "schoolAddress": {
              "stateOrProvince": "TX",
              "city": "Houston"
            },
            "schoolName": "Rice University"
          },
          {
            "ceebCode": "4704",
            "schoolType": "College",
            "ncesCode": "243744",
            "schoolAddress": {
              "stateOrProvince": "CA",
              "city": "Stanford"
            },
            "schoolName": "Stanford University"
          },
          {
            "ceebCode": "6003",
            "schoolType": "College",
            "ncesCode": "228723",
            "schoolAddress": {
              "stateOrProvince": "TX",
              "city": "College Station"
            },
            "schoolName": "Texas A&M University - College Station"
          },
          {
            "ceebCode": "6870",
            "schoolType": "College",
            "ncesCode": "225511",
            "schoolAddress": {
              "stateOrProvince": "TX",
              "city": "Houston"
            },
            "schoolName": "University of Houston - Main Campus"
          },
          {
            "ceebCode": "1836",
            "schoolType": "College",
            "ncesCode": "145637",
            "schoolAddress": {
              "stateOrProvince": "IL",
              "city": "Urbana"
            },
            "schoolName": "University of Illinois - Urbana"
          },
          {
            "ceebCode": "6879",
            "schoolType": "College",
            "ncesCode": "207500",
            "schoolAddress": {
              "stateOrProvince": "OK",
              "city": "Norman"
            },
            "schoolName": "University of Oklahoma"
          },
          {
            "ceebCode": "6882",
            "schoolType": "College",
            "ncesCode": "228778",
            "schoolAddress": {
              "stateOrProvince": "TX",
              "city": "Austin"
            },
            "schoolName": "University of Texas - Austin"
          },
          {
            "ceebCode": "6829",
            "schoolType": "College",
            "ncesCode": "228796",
            "schoolAddress": {
              "stateOrProvince": "TX",
              "city": "El Paso"
            },
            "schoolName": "University of Texas - El Paso"
          }
        ],
        "collegeType": [
          {
            "collegeType": "4-Year College"
          }
        ]
      }
    ],
    "affiliation": null,
    "graduation": null,
    "armedServices": null,
    "situation": null,
    "profession": null,
    "financialInformation": null,
    "applicationRestriction": null,
    "collegeAttendanceCriteria": null,
    "academics": [
      {
        "academicEligibility": "Minimum GPA",
        "academicEligibilityValue": 3.2
      }
    ],
    "degreeSeeking": [
      "Bachelor's Degree"
    ],
    "condition": null,
    "fieldsOfStudy": [
      {
        "fieldName": "Chemical Engineering",
        "cipCode": null
      },
      {
        "fieldName": "Civil Engineering",
        "cipCode": null
      },
      {
        "fieldName": "Electrical Engineering",
        "cipCode": null
      },
      {
        "fieldName": "Geological Engineering",
        "cipCode": null
      },
      {
        "fieldName": "Mechanical Engineering",
        "cipCode": null
      },
      {
        "fieldName": "Mining and Petroleum Engineering",
        "cipCode": null
      },
      {
        "fieldName": "Geology and Earth Science",
        "cipCode": null
      },
      {
        "fieldName": "Other",
        "cipCode": null
      },
      {
        "fieldName": "Physics",
        "cipCode": null
      },
      {
        "fieldName": "Environmental Engineering",
        "cipCode": null
      }
    ],
    "enrollmentStatus": [
      "Full-Time Only"
    ],
    "citizenshipStatuses": [
      "U.S. Citizen",
      "Permanent Resident"
    ],
    "graduationStatuses": null,
    "locations": [
      {
        "country": "US"
      }
    ],
    "interests": null,
    "studyAbroad": null,
    "age": null,
    "demographics": [
      "American Indian or Alaska Native",
      "Black or African American",
      "Hispanic",
      "Latino"
    ]
  },
  "maxAmountFormat": "5,000",
  "eligibilityCriteriaDescriptions": [
    "Minimum 3.20 GPA",
    "Resident of the U.S.",
    "Attending a 4year college or university at Prairie View A & M University, Penn State, University of Texas, University of Texas Austin, University of Oklahoma, University of Michigan-Ann Arbor, University of Houston, Texas A&M University, Rice University, Purdue University, Massachusetts Institute of Technology, Louisiana State University, University of Illinois Urbana-Champaign, Georgia Institute of Technology, Florida A&M University, Stanford University, North Carolina A&T State University, Colorado School of Mines",
    "College freshman, sophomore, or junior",
    "Seeking a bachelor's degree",
    "Studying geology, geophysics, physics, chemical, civil, electrical, environmental, mechanical, petroleum, geological, or geophysical engineering",
    "Fulltime student",
    "Planning to attend school in Stanford, California, Golden, Colorado, Tallahassee, Florida, Atlanta, Georgia, Champaign, Illinois, Baton Rouge, Louisiana, Cambridge, Massachusetts, Greensboro, North Carolina, Norman, Oklahoma, University Park, Pennsylvania, or Austin, College Station, El Paso, Houston, or Prairie View, Texas",
    "American Indian, Alaska Native, African American, Black, Hispanic, or Latino"
  ],
  "isEssayRequired": false,
  "isNeedBased": false,
  "isMeritBased": true,
  "cbScholarshipId": "PcZrNvnD7u3d",
  "awardMin": 5000,
  "awardMax": 5000
}
"""


# Function to preprocess user data
# Function to preprocess user data recursively
def preprocess_user_data(user_dict):
    # Convert non-numeric fields to appropriate numeric representations
    user_dict["demographics"]["age"] = float(user_dict["demographics"]["age"])
    user_dict["scores"] = {
        key: float(value) for key, value in user_dict["scores"].items()
    }

    # One-hot encode categorical variables
    categorical_vars = [
        "educationLevel",
        "occupation",
        "incomeLevel",
        "maritalStatus",
        "currentGradeLevel",
    ]
    for var in categorical_vars:
        if var in user_dict["demographics"]:
            preprocess_recursive(user_dict["demographics"], var)

    return user_dict


# Function to preprocess scholarship data recursively
def preprocess_scholarship_data(scholarship_dict):
    # Convert non-numeric fields to appropriate numeric representations
    scholarship_dict["awardMin"] = float(scholarship_dict["awardMin"])
    scholarship_dict["awardMax"] = float(scholarship_dict["awardMax"])

    # One-hot encode categorical variables
    categorical_vars = ["degreeSeeking", "locations"]
    for var in categorical_vars:
        if var in scholarship_dict["eligibilityCriteria"]:
            preprocess_recursive(scholarship_dict["eligibilityCriteria"], var)

    return scholarship_dict


# Recursive function to preprocess nested dictionaries and encode categorical variables
def preprocess_recursive(obj, var):
    if isinstance(obj, dict):
        for key, value in obj.items():
            if isinstance(value, list):
                for item in value:
                    preprocess_recursive(item, var)
            elif isinstance(value, dict):
                preprocess_recursive(value, var)
            elif key == var:
                # Convert categorical variable to one-hot encoding
                one_hot_encoder = OneHotEncoder(sparse_output=False)
                encoded_values = one_hot_encoder.fit_transform(
                    np.array(value).reshape(-1, 1)
                )
                # Replace original value with one-hot encoded values
                obj[key] = encoded_values.tolist()


# user_dict = json.loads(user_json)
# scholarship_dict = json.loads(scholarship_json)

# # Preprocess user data
# # user_dict = preprocess_user_data(user_dict)

# # Preprocess scholarship data
# # scholarship_dict = preprocess_scholarship_data(scholarship_dict)

# # Now, you can proceed with running the model


# # Convert dictionaries to Python objects
# # user = dict_to_user(user_dict)
# # scholarship = dict_to_scholarship(scholarship_dict)

# user = DefaultMunch.fromDict(user_dict)
# scholarship = DefaultMunch.fromDict(scholarship_dict)

# # Instantiate the model
# svd_model = ScholarshipSVDModel(user, scholarship)

# # Predict the likelihood of the user getting the scholarship
# likelihood = svd_model.predict_likelihood()

# print("Likelihood of the user getting the scholarship:", likelihood)
