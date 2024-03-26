import json
import pandas as pd
import utils

## scholarships =
##Load in whole scholarship json from database
## student_responses = 
##Load in whole student response from database
student_responses = utils.student_responses
with open('updated_app_info.json', 'r') as data:
    scholarships = json.load(data)

  

top_scholarships = utils.append_scores(student_responses, scholarships)
with open('top_scholarships.json', 'w') as file:
    json.dump(top_scholarships, file, indent=4)

### This returns the top scholarships with their name and score
