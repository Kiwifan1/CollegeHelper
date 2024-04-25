from enum import Enum


class EducationLevel(Enum):
    HSFR = "High School Freshman"
    HSSO = "High School Sophomore"
    HSJR = "High School Junior"
    HSSR = "High School Senior"
    COFR = "College Freshman"
    COSO = "College Sophomore"
    COJR = "College Junior"
    COSR = "College Senior"
    Grad = "Graduate"
    Other = "Other"
    PreferNotToSay = "Prefer not to say"


class Occupation(Enum):
    Student = "Student"
    Employed = "Employed"
    Unemployed = "Unemployed"
    Retired = "Retired"
    Other = "Other"
    PreferNotToSay = "Prefer not to say"


class MaritalStatus(Enum):
    Single = "Single"
    Married = "Married"
    Divorced = "Divorced"
    Widowed = "Widowed"
    PreferNotToSay = "Prefer not to say"


class IncomeLevel(Enum):
    Below30K = "0-30k"
    To48K = "30k-48k"
    To75K = "48k-75k"
    To110K = "75k-110k"
    Above110K = ">110k"
    PreferNotToSay = "Prefer not to say"

class NationalityEnum(Enum):
  Alaska_Native = 'Alaska Native'
  Native_Pacific_Islander = 'Native Pacific Islander'
  Native_Hawaiian = 'Native Hawaiian'
  American_Indian = 'American Indian'
  Navajo = 'Navajo'
  Gila_River_Indian_Community = 'Gila River Indian Community'
  Seneca_Nation_of_Indians = 'Seneca Nation of Indians'
  Passamaquoddy = 'Passamaquoddy'
  Coeur_dAlene_Tribe = "Coeur d'Alene Tribe"
  Isleta_Pueblo = 'Isleta Pueblo'
  St_Regis = 'St. Regis'
  Spirit_Lake_Tribe = 'Spirit Lake Tribe'
  Walla_Walla = 'Walla Walla'
  Shinnecock = 'Shinnecock'
  Cowlitz = 'Cowlitz'
  Coushatta = 'Coushatta'
  Umatilla = 'Umatilla'
  Salish = 'Salish'
  Tohono_Oodham = "Tohono O'odham"
  Paiute = 'Paiute'
  Apache = 'Apache'
  Mohican = 'Mohican'
  Cayuga = 'Cayuga'
  Oneida = 'Oneida'
  Hispanic = 'Hispanic'
  South_Asian = 'South Asian'
  Korean = 'Korean'
  Ukrainian = 'Ukrainian'
  African = 'African'
  Middle_Eastern = 'Middle Eastern'
  Southeast_Asian = 'Southeast Asian'
  American_Indian_or_Alaska_Native = 'American Indian or Alaska Native'
  African_American = 'African American'
  Native_Hawaiian_or_Other_Pacific_Islander = 'Native Hawaiian or Other Pacific Islander'
  Chinese = 'Chinese'
  Finnish = 'Finnish'
  Bengal = 'Bengal'
  Arabic = 'Arabic'
  Syrian = 'Syrian'
  Prefer_to_Self_Identify = 'Prefer to Self-Identify'


class EthnicityEnum(Enum):
  Caucasian = 'Caucasian'
  Black_or_African_American = 'Black or African American'
  Portuguese = 'Portuguese'
  Saponi = 'Saponi'
  Penobscot = 'Penobscot'
  Miami = 'Miami'
  Tunica_Biloxi = 'Tunica Biloxi'
  Greek = 'Greek'
  Sault = 'Sault'
  Iraqi = 'Iraqi'
  Bolivians = 'Bolivians'
  Modoc = 'Modoc'
  Irish = 'Irish'
  Armenian = 'Armenian'
  Chickasaw = 'Chickasaw'
  Chippewa = 'Chippewa'
  Russian = 'Russian'
  Arapaho = 'Arapaho'
  Osage = 'Osage'
  Lummi = 'Lummi'
  Poospatuck = 'Poospatuck'
  Chitimacha = 'Chitimacha'
  Wanapum = 'Wanapum'
  Catawba = 'Catawba'
  Afghani = 'Afghani'
  Sri_Lankan = 'Sri Lankan'
  Brazilian = 'Brazilian'
  Ottawa = 'Ottawa'
  Crow = 'Crow'
  Ethiopian = 'Ethiopian'
  Vietnamese = 'Vietnamese'
  Filipino = 'Filipino'
  Maliseet = 'Maliseet'
  Jamaican = 'Jamaican'
  Yavapai = 'Yavapai'
  Cambodian = 'Cambodian'
  Wichita = 'Wichita'
  Taiwanese = 'Taiwanese'
  Onondaga = 'Onondaga'
  Mohawk = 'Mohawk'
  Wampanoag_Aquinnah = 'Wampanoag (Aquinnah)'
  Latino = 'Latino'
  Pequot = 'Pequot'
  Czech = 'Czech'
  Shoshone = 'Shoshone'
  Serbian = 'Serbian'
  Caribbean = 'Caribbean'
  German = 'German'
  Yaqui = 'Yaqui'
  Maltese = 'Maltese'
  Lebanese = 'Lebanese'
  Ponca = 'Ponca'
  Swedish = 'Swedish'
  Laguna_Pueblo = 'Laguna Pueblo'
  Tuscarora = 'Tuscarora'
  Pakistani = 'Pakistani'
  Italian = 'Italian'
  Narragansett = 'Narragansett'
  Norwegian = 'Norwegian'
  Swiss = 'Swiss'
  Caddo = 'Caddo'
  Hoopa = 'Hoopa'
  Polish = 'Polish'
  Slovene = 'Slovene'
  Scottish = 'Scottish'
  Syrian = 'Syrian'
  Hmong = 'Hmong'
  West_Asian = 'West Asian'
  Paiute = 'Paiute'
  Mohican = 'Mohican'
  Cayuga = 'Cayuga'
  Oneida = 'Oneida'
  Jewish = 'Jewish'
  Micmacs = 'Micmacs'
  Cheyenne = 'Cheyenne'
  Prefer_to_Self_Identify = 'Prefer to Self-Identify'


class GenderIdentityEnum(Enum):
  Male = 'Male'
  Female = 'Female'
  Nonbinary = 'Nonbinary'
  Transgender = 'Transgender'
  Transgender_Male_to_Female = 'Transgender Male to Female'
  Transgender_Female_to_Male = 'Transgender Female to Male'
  Genderqueer = 'Genderqueer'
  Asexual = 'Asexual'
  Intersex = 'Intersex'
  LGBTQ_Ally = 'LGBTQ Ally'
  Lesbian = 'Lesbian'
  Bisexual = 'Bisexual'
  Two_Spirit = 'Two-Spirit'
  Prefer_to_Self_Identify = 'Prefer to Self-Identify'


class SexualOrientationEnum(Enum):
  Heterosexual = 'Heterosexual'
  Gay = 'Gay'
  LGBTQIA_plus = 'LGBTQIA+'
  Prefer_to_Self_Identify = 'Prefer to Self-Identify'

class CitizenshipStatusesEnum(Enum):
    US_Citizen = "U.S. Citizen"
    US_National = "U.S. National"
    Not_US_Citizen = "Not a U.S. Citizen"
    Pending_DACA_Application = "Pending DACA Application"
    Canadian_Citizen = "Canadian Citizen"
    Asylum_Seeker_or_Asylee = "Asylum-Seeker or Asylee"
    Conditional_Permanent_Resident = "Conditional Permanent Resident"
    FAFSA_Eligible_Non_Citizen = "FAFSA-Eligible Non-Citizen"
    Humanitarian_Parolee = "Humanitarian Parolee"
    Refugee = "Refugee"
    Permanent_Resident = "Permanent Resident"
    Cuban_or_Haitian_Entrant = "Cuban or Haitian Entrant"
    Current_DACA_Status = "Current DACA Status"
    California_AB_540 = "California AB 540"
    Other = "Other"
    Prefer_to_Self_Identify = "Prefer to Self-Identify"


class DegreeSeekingEnum(Enum):
    Professional_Badge = "Professional Badge"
    PhD = "PhD"
    One_year_Certificate = "1-year Certificate"
    High_School = "High School"
    GED = "GED"
    Professional_Micro_credential = "Professional Micro-credential"
    Law_Degree = "Law Degree"
    Professional_Certification = "Professional Certification"
    MBA = "MBA"
    Doctor_of_Medicine = "Doctor of Medicine"
    Associate_Degree = "Associate Degree"
    Graduate_Degree = "Graduate Degree"
    Bachelors_Degree = "Bachelor's Degree"
    MFA = "MFA"


class MiscellaneousCriteriaEnum(Enum):
    Accepted_into_a_Sanctioned_International_Study_Program = (
        "Accepted into a Sanctioned International Study Program"
    )
    Animal_Care_Experience = "Animal Care Experience"
    Pilot_in_Training = "Pilot in Training"
    Demonstrate_Leadership_Dependability_and_Citizenship = (
        "Demonstrate Leadership, Dependability, and Citizenship"
    )
    Respect_and_Value_Diversity = "Respect and Value Diversity"
    LGBTQ_Advocate = "LGBTQ Advocate"
    Participate_in_Travel_Abroad_Program = "Participate in Travel Abroad Program"
    Conscientious_Objector = "Conscientious Objector"
    Demonstrate_Academic_Achievement_and_Motivation_to_Succeed_in_College = (
        "Demonstrate Academic Achievement and Motivation to Succeed in College"
    )
    Agnostic = "Agnostic"
    Demonstrate_Artistic_Talent = "Demonstrate Artistic Talent"
    Bilingual = "Bilingual"
    Theatre_Experience_at_a_Local_Community_Theatre = (
        "Theatre Experience at a Local Community Theatre"
    )
    Demonstrate_Leadership_Ambition_Achievement_and_Good_Academic_Standing = (
        "Demonstrate Leadership, Ambition, Achievement, and Good Academic Standing"
    )
    Amateur_Radio_License = "Amateur Radio License"
    Demonstrate_Leadership_Abilities = "Demonstrate Leadership Abilities"
    Demonstrate_Strong_Character = "Demonstrate Strong Character"
    Demonstrates_the_Most_Compassion_in_Caring_and_Treatment_of_Patients = (
        "Demonstrates the Most Compassion in Caring and Treatment of Patients"
    )
    Tall_Stature = "Tall Stature"
    Other = "Other"
    Demonstrate_a_Strong_Christian_Faith = "Demonstrate a Strong Christian Faith"
    Demonstrate_Strong_Academic_Achievement = "Demonstrate Strong Academic Achievement"
    Demonstrate_a_Commitment_to_Improving_the_Quality_of_Life_of_Others = (
        "Demonstrate a Commitment to Improving the Quality of Life of Others"
    )
    English_Is_Second_Language = "English Is Second Language"
    Demonstrate_Character_and_Leadership_Qualities = (
        "Demonstrate Character and Leadership Qualities"
    )
    All_Academic_Team_Honors = "All-Academic Team Honors"
    Pilot = "Pilot"
    Demonstrate_Good_Character_and_Standing_in_the_Community = (
        "Demonstrate Good Character and Standing in the Community"
    )
    Possess_a_Desire_to_Achieve = "Possess a Desire to Achieve"
    Eagle_Scout = "Eagle Scout"
    Participant_in_a_Fire_Cadet_Program = "Participant in a Fire Cadet Program"
    Demonstrate_Good_Character = "Demonstrate Good Character"
    Demonstrate_a_Strong_Work_Ethic = "Demonstrate a Strong Work Ethic"
    Employed_at_an_Asian_Restaurant = "Employed at an Asian Restaurant"
    Atheist = "Atheist"
    Humanist = "Humanist"
    Completed_Latin_Studies_In_High_School = "Completed Latin Studies In High School"
    Fluent_in_Spanish = "Fluent in Spanish"
    Demonstrate_Optimism_and_Determination = "Demonstrate Optimism and Determination"


class InterestCriteriaEnum(Enum):
    Real_Estate = "Real Estate"
    History = "History"
    Wildlife_Conservation = "Wildlife Conservation"
    Building_Trades = "Building Trades"
    Motorcycling = "Motorcycling"
    Writing = "Writing"
    Literature = "Literature"
    Social_Justice = "Social Justice"
    Media = "Media"
    Welding = "Welding"
    Aviation = "Aviation"
    International_Travel = "International Travel"
    Entrepreneurship = "Entrepreneurship"
    Running = "Running"
    Leadership = "Leadership"
    Performing_and_Theatrical_Arts = "Performing and Theatrical Arts"
    Outdoor_Activities = "Outdoor Activities"
    Environmentalism = "Environmentalism"
    Entertainment = "Entertainment"
    Art = "Art"
    Sports = "Sports"
    Diversity = "Diversity"
    Health = "Health"
    Other = "Other"
    Science = "Science"
    Racial_Equality = "Racial Equality"
    Jazz = "Jazz"
    Special_Event_and_Tent_Industry = "Special Event and Tent Industry"
    Teaching = "Teaching"
    Business = "Business"
    Golf = "Golf"
    Public_Service = "Public Service"
    Public_Affairs = "Public Affairs"
    Political_Science = "Political Science"
    Broadcast_Journalism = "Broadcast Journalism"
    Music = "Music"
    Health_Research = "Health Research"
    Poetry = "Poetry"
    Agriculture = "Agriculture"
    Nature = "Nature"
    Construction = "Construction"
    Chemistry = "Chemistry"
    Government = "Government"


class InterestOtherEnum(Enum):
    International_relations_and_global_affairs = (
        "International relations and global affairs"
    )
    Hereford_Cattle_Breeding = "Hereford Cattle Breeding"
    Motorcycling = "Motorcycling"
    Endangered_Species = "Endangered Species"
    Welding = "Welding"
    Bedding_Crops = "Bedding Crops"
    French = "French"
    Physics = "Physics"
    Global_perspective = "Global perspective"
    Hawaiian_language_culture_and_history = "Hawaiian language, culture, and history"
    California_seed_industry = "California seed industry"
    Performing_and_Theatrical_Arts = "Performing and Theatrical Arts"
    Computer_logic_and_programming_technology = (
        "Computer logic and programming technology"
    )
    woody_plant_production = "woody plant production"
    Communications = "Communications"
    e_sports = "e-sports"
    National_or_international_security_policy = (
        "National or international security policy"
    )
    Trigonometry = "Trigonometry"
    Content_creation = "Content creation"
    Engineering = "Engineering"
    Public_Service = "Public Service"
    Energy_Industry = "Energy Industry"
    Floral_crops = "Floral crops"
    Poetry = "Poetry"
    Horticulture = "Horticulture"
    Industries_using_and_or_manufacturing_pressure_vessels_or_related_components = (
        "Industries using and/or manufacturing pressure vessels or related components"
    )
    Construction = "Construction"
    Floridas_nursery_and_landscape_industry = "Florida's nursery and landscape industry"
    Chemistry = "Chemistry"
    Iron_and_steel_industry = "Iron and steel industry"
    Wildlife_Management = "Wildlife Management"
    International_Studies = "International Studies"
    Preventing_overdoses = "Preventing overdoses"
    History = "History"
    Public_Speaking = "Public Speaking"
    Baseball = "Baseball"
    Writing = "Writing"
    Metal_Wood_Fabrication = "Metal/Wood Fabrication"
    Commercial = "Commercial"
    Social_Justice = "Social Justice"
    Working_with_the_elderly = "Working with the elderly"
    Social_studies = "Social studies"
    Drumming = "Drumming"
    Dorper_Sheep = "Dorper Sheep"
    Language = "Language"
    Equipment_leasing_industry = "Equipment leasing industry"
    Wood_Plant_Propagation = "Wood Plant Propagation"
    Taken_advanced_placement_courses = "Taken advanced placement courses"
    Human_Rights = "Human Rights"
    Creative_writing = "Creative writing"
    Transportation = "Transportation"
    Military = "Military"
    Diversity = "Diversity"
    Radio_service = "Radio service"
    Racial_Equality = "Racial Equality"
    Medicine = "Medicine"
    Broadcasting = "Broadcasting"
    Creative_arts_arts_and_humanities = "Creative arts (arts and humanities)"
    Public_Policy = "Public Policy"
    First_Aid = "First Aid"
    Clinical_or_non_clinical_career_in_health_industry = (
        "Clinical or non-clinical career in health industry"
    )
    Welfare_and_protection_of_animals = "Welfare and protection of animals"
    Career_involving_marketing = "Career involving marketing"
    Art_of_the_Spanish_Americas = "Art of the Spanish Americas"
    STEM = "STEM"
    Media_Journalism = "Media/Journalism"
    Architecture = "Architecture"
    Environmental_marketing_and_sales = "Environmental marketing and sales"
    Securities_litigation = "Securities litigation"
    Doctor = "Doctor"
    Being_a_professional_pilot = "Being a professional pilot"
    Artificial_Intelligence_AI = "Artificial Intelligence (AI)"
    Mental_health = "Mental health"
    Workers_Rights = "Worker's Rights"
    NASAs_mission = "NASA's mission"
    Agriculture = "Agriculture"
    Photography = "Photography"
    Public_health = "Public health"
    Interest_in_working_with_HealthPartners_upon_graduation = (
        "Interest in working with HealthPartners upon graduation"
    )
    Truck_Driving = "Truck Driving"
    womens_rights_and_issues = "women's rights and issues"
    Dance = "Dance"
    Active_voice_of_change_in_community = "Active voice of change in community"
    Creative_Writing = "Creative Writing"
    inclusion = "inclusion"
    Product_development_and_design = "Product development and design"
    Public_transportation = "Public transportation"
    Social_science = "Social science"
    Mentoring = "Mentoring"
    Involved_in_speech = "Involved in speech"
    Interest_and_commitment_of_working_in_high_needs_schools = (
        "Interest and commitment of working in high-needs schools"
    )
    Clarinet = "Clarinet"
    Traditional_Service_Fields = "Traditional Service Fields"
    Passion_for_nursing = "Passion for nursing"
    English = "English"
    STEAM_based_subjects = "STEAM-based subjects"
    Exhibit_desire_to_bring_back_expertise_from_their_college_experience_to_help_the_Hawaiian_community = "Exhibit desire to bring back expertise from their college experience to help the Hawaiian community"
    Math = "Math"
    Research = "Research"
    Officer_Cadet_training = "Officer Cadet training"
    Classical_Composition = "Classical Composition"
    Journalism = "Journalism"
    Financial_law = "Financial law"
    Social_Studies = "Social Studies"
    Family_and_child_practice = "Family and child practice"
    Civil_War = "Civil War"
    Wildlife_Trapping = "Wildlife Trapping"
    Voice = "Voice"
    Travelling = "Travelling"
    Technology = "Technology"
    Passion_for_biomedical_and_biopharmaceutical_innovation = (
        "Passion for biomedical and biopharmaceutical innovation"
    )
    Science = "Science"
    Public_advocacy = "Public advocacy"
    HEREFORD_CATTLE_BREEDING = "HEREFORD CATTLE BREEDING"
    Interest_in_the_values_and_tradition_of_the_Hawaiian_Civic_Club_Movement = (
        "Interest in the values and tradition of the Hawaiian Civic Club Movement"
    )
    Organ = "Organ"
    Ethics_and_integrity = "Ethics and integrity"
    Thermodynamics = "Thermodynamics"
    Chicano_studies = "Chicano studies"
    Sports_marketing = "Sports marketing"
    Medicine_or_cancer_research = "Medicine or cancer research"
    Fishery_conservation_and_sustainability = "Fishery conservation and sustainability"
    Math_and_science = "Math and science"
    Sustainability = "Sustainability"
    Theater = "Theater"
    Legal_studies = "Legal studies"
    Space_transportation = "Space transportation"
    Hopsice = "Hopsice"
    Archeology = "Archeology"
    Drafting = "Drafting"
    Providing_healthcare_to_underserved_communities = (
        "Providing healthcare to underserved communities"
    )
    Safe_schools_and_citizenship = "Safe schools and citizenship"
    International_Relations = "International Relations"
    Mathematics = "Mathematics"
    Occupational_Safety_Training = "Occupational Safety Training"
    Healthcare = "Healthcare"
    Beverage_Innovation = "Beverage Innovation"
    Has_interests_besides_academics = "Has interests besides academics"
    Sailing = "Sailing"
    Woody_Plant_Breeding = "Woody Plant Breeding"
    Southwestern_Field_Archaeology = "Southwestern Field Archaeology"
    International_Travel = "International Travel"
    Aviation = "Aviation"
    Library = "Library"
    Entrepreneurship = "Entrepreneurship"
    Floodplain_or_stormwater_management = "Floodplain or stormwater management"
    Chevron_and_energy_industry = "Chevron and energy industry"
    Pulp_and_Paper_Industry = "Pulp and Paper Industry"
    Driving = "Driving"
    Recreation = "Recreation"
    Athletics = "Athletics"
    Desires_to_become_self_supporting = "Desires to become self-supporting"
    Consulting = "Consulting"
    Interested_in_home_economics = "Interested in home economics"
    Finance = "Finance"
    Beef_or_dairy_cattle = "Beef or dairy cattle"
    Aerodynamics = "Aerodynamics"
    Radio = "Radio"
    Technical_field = "Technical field"
    Law = "Law"
    Hawaiian_language_culture_history = "Hawaiian language, culture, history"
    Horticultural_Sales_and_Marketing = "Horticultural Sales and Marketing"
    Special_Education = "Special Education"
    Classical_Music = "Classical Music"
    Engineering_and_Mathematics = "Engineering and Mathematics"
    Consumer_Retail_industries = "Consumer/Retail industries"
    Studying_Abroad = "Studying Abroad"
    NASA = "NASA"
    Western_water = "Western water"
    Sexual_assault_and_violence_awareness = "Sexual assault and violence awareness"
    Gerontology_and_dementia = "Gerontology and dementia"
    Social_concerns = "Social concerns"
    Gaming = "Gaming"
    Computer_Electronics = "Computer/Electronics"
    Fuels_combustion_or_the_power_industry = "Fuels, combustion, or the power industry"
    Japanese_culture = "Japanese culture"
    Performing_Arts = "Performing Arts"
    Accounting = "Accounting"


class DegreeSeekingEnum(Enum):
    Professional_Badge = "Professional Badge"
    PhD = "PhD"
    One_year_Certificate = "1-year Certificate"
    High_School = "High School"
    GED = "GED"
    Professional_Micro_credential = "Professional Micro-credential"
    Law_Degree = "Law Degree"
    Professional_Certification = "Professional Certification"
    MBA = "MBA"
    Doctor_of_Medicine = "Doctor of Medicine"
    Associate_Degree = "Associate Degree"
    Graduate_Degree = "Graduate Degree"
    Bachelors_Degree = "Bachelor's Degree"
    MFA = "MFA"


class FieldsOfStudyEnum(Enum):
    Wildlife_Biology = "Wildlife Biology."
    Costume = "Costume"
    Energy_Law = "Energy Law"
    Social_Services = "Social Services"
    Mathematics_General = "Mathematics, General."
    Environmental_Biology = "Environmental Biology."
    Anthropology = "Anthropology."
    Massage_Therapy_and_Bodywork = "Massage Therapy and Bodywork"
    Child_care_Director = "Child care Director"
    Outdoor_Education = "Outdoor Education."
    Cast_Metal_Industry = "Cast Metal Industry"
    Electrical_Electronics_Maintenance_and_Repair_Technology = (
        "Electrical/Electronics Maintenance and Repair Technology."
    )
    Bilingual_and_Multicultural_Education = "Bilingual and Multicultural Education"
    Occupational_Therapist_Assistant = "Occupational Therapist Assistant"
    General_Sales_Merchandising_and_Related_Marketing_Operations = (
        "General Sales, Merchandising and Related Marketing Operations."
    )
    Music_History_Literature_and_Theory = "Music History, Literature, and Theory."
    Wildlife_Fish_and_Wildlands_Science_and_Management = (
        "Wildlife, Fish and Wildlands Science and Management."
    )
    Sports_and_Fitness_Management = "Sports and Fitness Management"
    Mathematics = "Mathematics."
    Latin_Language = "Latin Language"
    Physical_Science_Technologies_Technicians = (
        "Physical Science Technologies/Technicians."
    )
    Apparel_and_Textile_Science = "Apparel and Textile Science"
    Archives = "Archives"
    Slavic_Studies = "Slavic Studies"
    Journalism = "Journalism."
    Equine_Studies = "Equine Studies"
    Biological_Biosystems_Engineering = "Biological/Biosystems Engineering."
    International_Relations = "International Relations"
    Agricultural_and_Food_Products_Processing = (
        "Agricultural and Food Products Processing"
    )
    Electrical_Electronics_and_Communications_Engineering = (
        "Electrical, Electronics and Communications Engineering."
    )
    Hospitality_Administration_Management = "Hospitality Administration/Management."
    Tax_Law = "Tax Law"
    Agricultural_and_Horticultural_Plant_Breeding = (
        "Agricultural and Horticultural Plant Breeding."
    )
    Human_Resources_Management_Personnel_Administration_General = (
        "Human Resources Management/Personnel Administration, General."
    )
    Truck_and_Bus_Driver_Commercial_Vehicle_Operator_and_Instructor = (
        "Truck and Bus Driver/Commercial Vehicle Operator and Instructor."
    )
    Electronics_Equipment_Installation_and_Repair = (
        "Electronics Equipment Installation and Repair"
    )
    Electrocardiograph_Technology_Technician = (
        "Electrocardiograph Technology/Technician."
    )
    Parliamentary_Procedure = "Parliamentary Procedure"
    Agronomy_and_Crop_Science = "Agronomy and Crop Science."
    Fashion_Apparel_Design = "Fashion/Apparel Design."
    Ceramics = "Ceramics"
    Biblical_Studies = "Biblical Studies"
    Dancing = "Dancing."
    Historical_Preservation = "Historical Preservation"
    Clinical_Medical_Laboratory_Assistant = "Clinical/Medical Laboratory Assistant."
    Social_Studies_Teacher_Education = "Social Studies Teacher Education."
    Kidney_Disease = "Kidney Disease"
    Banking_and_Financial_Support_Services = "Banking and Financial Support Services."
    Small_Business_Management = "Small Business Management"
    Precision_Systems_Maintenance_and_Repair_Technologies_Other = (
        "Precision Systems Maintenance and Repair Technologies, Other."
    )
    Welding = "Welding"
    Theological_and_Ministerial_Studies = "Theological and Ministerial Studies"
    Architecture = "Architecture."
    Management_Sciences_and_Information_Systems = (
        "Management Sciences and Information Systems"
    )
    Kinesiotherapy_Kinesiotherapist = "Kinesiotherapy/Kinesiotherapist."
    Business_Office_Automation_Technology_Data_Entry = (
        "Business/Office Automation/Technology/Data Entry."
    )
    Jewish_Studies = "Jewish Studies"
    Materials_Science = "Materials Science."
    General_Construction_Trades = "General Construction Trades"
    Land_Use_Planning_and_Management_Development = (
        "Land Use Planning and Management/Development."
    )
    Agricultural_Mechanics_and_Machinery = "Agricultural Mechanics and Machinery"
    Water_Quality_and_Wastewater_Treatment_Management_and_Recycling_Technology_Technician = "Water Quality and Wastewater Treatment Management and Recycling Technology/Technician."
    Business_Administration_and_Management_General = (
        "Business Administration and Management, General."
    )
    Culinary_Arts_and_Related_Services = "Culinary Arts and Related Services."
    Actuarial_Science = "Actuarial Science."
    Airline_Commercial_Professional_Pilot_and_Flight_Crew = (
        "Airline/Commercial/Professional Pilot and Flight Crew."
    )
    Communication_Disorders_Sciences_and_Services = (
        "Communication Disorders Sciences and Services."
    )
    German_History = "German History"
    Interdisciplinary_Studies = "Interdisciplinary Studies"
    International_Studies = "International Studies"
    Missionary_Studies = "Missionary Studies"
    Radiologist_Assistant = "Radiologist Assistant."
    Theater_Education = "Theater Education"
    Packaging = "Packaging"
    Industrial_and_Organizational_Psychology = (
        "Industrial and Organizational Psychology"
    )
    Sciences = "Sciences"
    Sign_Language = "Sign Language"
    Health_Professions_and_Related_Clinical_Sciences_Other = (
        "Health Professions and Related Clinical Sciences, Other."
    )
    Computer_Systems_Analysis = "Computer Systems Analysis"
    Geological_Geophysical_Engineering = "Geological/Geophysical Engineering."
    Foodservice_Systems_Administration_Management = (
        "Foodservice Systems Administration/Management."
    )
    Engineering_Industrial_Management = "Engineering/Industrial Management."
    Fine_Studio_Arts_General = "Fine/Studio Arts, General."
    Speech_Language_Pathology_Pathologist = "Speech-Language Pathology/Pathologist."
    Accounting = "Accounting."
    Film_Cinema_Video_Studies = "Film/Cinema/Video Studies."
    Medical_Records_Technician = "Medical Records Technician"
    Religious_Sacred_Music = "Religious/Sacred Music."
    Biology_General = "Biology, General."
    Structural_Engineering = "Structural Engineering"
    Engine_Machinist = "Engine Machinist."
    International_Law_and_Legal_Studies = "International Law and Legal Studies."
    Paralegal = "Paralegal"
    Welding_Engineering = "Welding Engineering"
    Social_Sciences_General = "Social Sciences, General."
    Metal_and_Jewelry_Arts = "Metal and Jewelry Arts"
    Counseling_Psychology = "Counseling Psychology"
    Environmental_Law = "Environmental Law"
    Agricultural_Mechanization = "Agricultural Mechanization."
    Math = "Math"
    Journalism = "Journalism"
    Operations_Management = "Operations Management"
    Reading = "Reading."
    Pharmacy_and_Pharmaceutical_Sciences = "Pharmacy and Pharmaceutical Sciences"
    Costume_Design = "Costume Design."
    Law_Libraries_and_Librarianship = "Law Libraries and Librarianship"
    Hydraulic_Engineering = "Hydraulic Engineering"
    Liberal_Arts_and_Sciences_General_Studies_and_Humanities = (
        "Liberal Arts and Sciences, General Studies and Humanities."
    )
    Occupational_Therapist_Assistant = "Occupational Therapist Assistant."
    Ceramic_Arts_and_Ceramics = "Ceramic Arts and Ceramics."
    Child_Development = "Child Development"
    Nonprofit_and_Public_Management = "Nonprofit and Public Management"
    Law_and_Legal_Studies = "Law and Legal Studies"
    Environmental_Studies = "Environmental Studies."
    Equestrian_Equine_Studies = "Equestrian/Equine Studies."
    Mathematics_Other = "Mathematics, Other."
    Environmental_Engineering_Technician = "Environmental Engineering Technician"
    Employee_Benefits = "Employee Benefits"
    Divinity_Ministry = "Divinity/Ministry."
    Public_Health_Nursing = "Public Health Nursing"
    Medical_Residency_Programs_Subspecialty_Certificates = (
        "Medical Residency Programs - Subspecialty Certificates."
    )
    Natural_Resources_Management_and_Policy_Other = (
        "Natural Resources Management and Policy, Other."
    )
    Information_Technology = "Information Technology"
    French_Language_and_Literature = "French Language and Literature"
    Japanese_Language_and_Literature = "Japanese Language and Literature"
    Data_Processing = "Data Processing"
    Water_Resources_Engineering = "Water Resources Engineering."
    Medical_Insurance_Coding = "Medical Insurance Coding"
    Liberal_Arts_and_Humanities = "Liberal Arts and Humanities"
    Hair_Design = "Hair Design"
    Medicine = "Medicine."
    HVAC_and_Refrigeration_Engineering_Technician = (
        "HVAC and Refrigeration Engineering Technician"
    )
    Utilities = "Utilities"
    Secondary_Education_and_Teaching = "Secondary Education and Teaching."
    Metal_and_Jewelry_Arts = "Metal and Jewelry Arts."
    International_Law = "International Law"
    Alternative_Medicine_and_Holistic_Health = (
        "Alternative Medicine and Holistic Health"
    )
    Business_Law = "Business Law"
    Religion_Religious_Studies = "Religion/Religious Studies."
    Autobody_Collision_and_Repair_Technology_Technician = (
        "Autobody/Collision and Repair Technology/Technician."
    )
    Truck_Bus_and_Commercial_Vehicle_Operation = (
        "Truck, Bus, and Commercial Vehicle Operation"
    )
    Advanced_Graduate_Dentistry_and_Oral_Sciences = (
        "Advanced/Graduate Dentistry and Oral Sciences."
    )
    Forensic_Science_and_Technology = "Forensic Science and Technology"
    City_Urban_Community_and_Regional_Planning = (
        "City/Urban, Community and Regional Planning."
    )
    Pomology = "Pomology"
    Alaska_Native_or_American_Indian_Studies = (
        "Alaska Native or American Indian Studies"
    )
    Atmospheric_Sciences_and_Meteorology = "Atmospheric Sciences and Meteorology"
    Broadcast_Engineering = "Broadcast Engineering"
    Archeology = "Archeology."
    Music_Pedagogy = "Music Pedagogy."
    Textiles = "Textiles"
    International_Global_Studies = "International/Global Studies."
    Real_Estate = "Real Estate"
    Law_Enforcement_Investigation_and_Interviewing = (
        "Law Enforcement Investigation and Interviewing."
    )
    Accounting_and_Related_Services = "Accounting and Related Services."
    Funeral_Service_and_Mortuary_Science = "Funeral Service and Mortuary Science"
    Family_and_Consumer_Sciences_Human_Sciences_General = (
        "Family and Consumer Sciences/Human Sciences, General."
    )
    Pastoral_Counseling_and_Specialized_Ministries = (
        "Pastoral Counseling and Specialized Ministries."
    )
    Biochemistry_Biophysics_and_Molecular_Biology = (
        "Biochemistry, Biophysics, and Molecular Biology"
    )
    Audiology = "Audiology"
    Environmental_Sustainability = "Environmental Sustainability"
    Special_Education_and_Teaching = "Special Education and Teaching."
    Palliative_Care_Nursing = "Palliative Care Nursing"
    Water_Resources = "Water Resources"
    Commercial_and_Advertising_Art = "Commercial and Advertising Art."
    Accounting_and_Finance = "Accounting and Finance."
    Energy_Management_and_Systems_Technology_Technician = (
        "Energy Management and Systems Technology/Technician."
    )
    Horticultural_Science = "Horticultural Science."
    Industrial_Electronics_Technician = "Industrial Electronics Technician"
    Behavioral_Aspects_of_Health = "Behavioral Aspects of Health."
    Logistics_and_Supply_Chain_Management = "Logistics and Supply Chain Management"
    Radio_Television_and_Digital_Communication = (
        "Radio, Television, and Digital Communication."
    )
    Surveying_Technology_Surveying = "Surveying Technology/Surveying."
    Practical_Nursing_Vocational_Nursing_and_Nursing_Assistants = (
        "Practical Nursing, Vocational Nursing and Nursing Assistants."
    )
    Aquatic_Biology_Limnology = "Aquatic Biology/Limnology."
    Geology_and_Earth_Science = "Geology and Earth Science"
    Pre_Dentistry_Studies = "Pre-Dentistry Studies."
    Museum_Studies = "Museum Studies"
    Advanced_Graduate_Dentistry_and_Oral_Sciences_Other = (
        "Advanced/Graduate Dentistry and Oral Sciences, Other."
    )
    Bioengineering_and_Biomedical_Engineering = (
        "Bioengineering and Biomedical Engineering"
    )
    Graphic_Communications = "Graphic Communications"
    Fire_Protection = "Fire Protection."
    Economics = "Economics"
    Art_Therapy = "Art Therapy"
    Corrections = "Corrections."
    Financial_Engineering = "Financial Engineering"
    Hotel_Motel_Administration_Management = "Hotel/Motel Administration/Management."
    Pre_Occupational_Therapy_Studies = "Pre-Occupational Therapy Studies."
    Property_Management = "Property Management"
    Lithuanian_History = "Lithuanian History"
    Turfgrass_Science = "Turfgrass Science"
    Agricultural_Engineering = "Agricultural Engineering"
    Business_Reporting = "Business Reporting"
    Musical_Theatre = "Musical Theatre."
    Vehicle_Maintenance_and_Repair_Technologies_General = (
        "Vehicle Maintenance and Repair Technologies, General."
    )
    Agricultural_Business = "Agricultural Business"
    Recreation = "Recreation"
    Polish_History = "Polish History"
    Mining_and_Petroleum_Engineering = "Mining and Petroleum Engineering"
    Law = "Law."
    Cultural_Studies_Critical_Theory_and_Analysis = (
        "Cultural Studies/Critical Theory and Analysis."
    )
    Graphic_Arts = "Graphic Arts"
    Floriculture_Floristry_Operations_and_Management = (
        "Floriculture/Floristry Operations and Management."
    )
    Statistics_General = "Statistics, General."
    Construction_Engineering = "Construction Engineering"
    Construction_Engineering = "Construction Engineering."
    Human_Resources_Management_and_Services_Other = (
        "Human Resources Management and Services, Other."
    )
    Forestry_Engineering = "Forestry Engineering"
    Kinesiology_and_Exercise_Science = "Kinesiology and Exercise Science."
    Norwegian_History = "Norwegian History"
    Exercise_Physiology = "Exercise Physiology"
    Dance = "Dance."
    Animal_Behavior_and_Ethology = "Animal Behavior and Ethology."
    Computational_and_Applied_Mathematics = "Computational and Applied Mathematics"
    Pest_Management = "Pest Management"
    Natural_Resources_Management_and_Policy = "Natural Resources Management and Policy."
    Electrical_Engineering = "Electrical Engineering"
    Nursing_Other = "Nursing, Other."
    Elementary_Education = "Elementary Education"
    Business_Administration_Management_and_Operations_Other = (
        "Business Administration, Management and Operations, Other."
    )
    Home_Health_Aide_Home_Attendant = "Home Health Aide/Home Attendant."
    Marine_Transportation = "Marine Transportation."
    Communications = "Communications"
    Early_Childhood_Education_and_Teaching = "Early Childhood Education and Teaching."
    Higher_Education = "Higher Education"
    Music_Therapy_Therapist = "Music Therapy/Therapist."
    Microbiology_General = "Microbiology, General."
    Molecular_Biology = "Molecular Biology."
    Economics = "Economics."
    Library_Science_and_Administration = "Library Science and Administration."
    Counseling_Psychology = "Counseling Psychology."
    Astronomy_and_Astrophysics = "Astronomy and Astrophysics."
    Operating_Room_Nursing = "Operating Room Nursing"
    Italian_Studies = "Italian Studies"
    Medical_Laboratory_Technician = "Medical Laboratory Technician"
    Creative_Writing = "Creative Writing."
    Dairy_Husbandry_and_Production = "Dairy Husbandry and Production."
    Illustration = "Illustration."
    Organizational_Leadership = "Organizational Leadership."
    International_Agriculture = "International Agriculture."
    Child_Development = "Child Development."
    Aircraft_Pilot_Private = "Aircraft Pilot (Private)."
    Mobil_Crane_Operation_Operator = "Mobil Crane Operation/Operator."
    Communications_Engineering = "Communications Engineering"
    Nursing_Registered_Nurse_RN_ASN_BSN_MSN = (
        "Nursing/Registered Nurse (RN, ASN, BSN, MSN)."
    )
    Real_Estate_Development = "Real Estate Development."
    Early_Childhood_Education = "Early Childhood Education"
    Advertising = "Advertising"
    Philosophy = "Philosophy"
    Rhetoric_and_Composition_Writing_Studies = (
        "Rhetoric and Composition/Writing Studies."
    )
    Economics_General = "Economics, General."
    Natural_Sciences = "Natural Sciences."
    Publishing = "Publishing."
    Behavioral_Sciences = "Behavioral Sciences."
    Fire_Protection_and_Prevention = "Fire Protection and Prevention"
    Industrial_Production_Technologies_Technicians = (
        "Industrial Production Technologies/Technicians."
    )
    Agricultural_Teacher_Education = "Agricultural Teacher Education"
    Public_Administration = "Public Administration"
    Forestry = "Forestry."
    Art = "Art."
    Employment_Law = "Employment Law"
    Textile_Engineering = "Textile Engineering"
    Intelligence = "Intelligence"
    Forensic_Psychology = "Forensic Psychology"
    Design_and_Visual_Communications = "Design and Visual Communications"
    Peace_Studies_and_Conflict_Resolution = "Peace Studies and Conflict Resolution."
    Social_Studies_Teacher_Education = "Social Studies Teacher Education"
    Physics_General = "Physics, General."
    Spanish_Language_and_Literature = "Spanish Language and Literature"
    Physical_Sciences = "Physical Sciences"
    Marketing = "Marketing"
    Computer_Engineering_General = "Computer Engineering, General."
    Library_Science = "Library Science"
    Master_of_Divinity = "Master of Divinity"
    Maritime_Studies = "Maritime Studies."
    Forestry = "Forestry"
    Environmental_Health = "Environmental Health."
    Nursing_Assistant = "Nursing Assistant"
    Animal_Sciences_General = "Animal Sciences, General."
    Packaging_Engineering = "Packaging Engineering"
    Foreign_Languages_and_Literatures_General = (
        "Foreign Languages and Literatures, General."
    )
    Data_Processing = "Data Processing."
    Organizational_Behavior_Studies = "Organizational Behavior Studies"
    Plant_Nursery_Operations_and_Management = "Plant Nursery Operations and Management."
    Digital_Communication_and_Media_Multimedia = (
        "Digital Communication and Media/Multimedia."
    )
    Norwegian_Studies = 'Norwegian Studies'
    Electrical_Electronics_Equipment_Installation_and_Repair_General = 'Electrical/Electronics Equipment Installation and Repair, General.'
    Health_Policy = 'Health Policy'
    Food_and_Nutrition = 'Food and Nutrition'
    Child_Care_Provider_Assistant = 'Child Care Provider/Assistant.'
    Arts_and_Crafts = 'Arts and Crafts'
    Vocational_High_School_and_Secondary_Business_Vocational_Industrial_Occupational_Diploma_Program = 'Vocational High School and Secondary Business/Vocational-Industrial/Occupational Diploma Program.'
    Folklore = 'Folklore'
    Graphic_Communications = 'Graphic Communications.'
    Music_Technology = 'Music Technology'
    Christian_Studies = 'Christian Studies.'
    Youth_Ministry = 'Youth Ministry.'
    Religious_Education = 'Religious Education'
    Metals = 'Metals'
    Performing_Arts = 'Performing Arts'
    Occupational_Therapy_Therapist = 'Occupational Therapy/Therapist.'
    Ground_Transportation = 'Ground Transportation'
    Manufacturing = 'Manufacturing'
    Computer_Engineering_Technician = 'Computer Engineering Technician'
    Teacher_Education_Multiple_Levels = 'Teacher Education, Multiple Levels.'
    Plant_Science = 'Plant Science'
    Surveying_Technician = 'Surveying Technician'
    Land_Management = 'Land Management'
    Playwriting_and_Screenwriting = 'Playwriting and Screenwriting'
    Technology_Education = 'Technology Education'
    American_History = 'American History'
    Architecture_and_Related_Services_Other = 'Architecture and Related Services, Other.'
    Homeland_Security_Law_Enforcement_Firefighting_and_Related_Protective_Services_Other = 'Homeland Security, Law Enforcement, Firefighting and Related Protective Services, Other.'
    Chinese_Language_and_Literature = 'Chinese Language and Literature'
    Surgical_Technologist = 'Surgical Technologist'
    Illustration = 'Illustration'
    Developmental_and_Child_Psychology = 'Developmental and Child Psychology'
    Plumbing_and_Related_Water_Supply_Services = 'Plumbing and Related Water Supply Services.'
    Petroleum_Industry = 'Petroleum Industry'
    Rehabilitation_Nursing = 'Rehabilitation Nursing'
    Playwriting_and_Screenwriting = 'Playwriting and Screenwriting.'
    Speech_Language_Pathology = 'Speech Language Pathology'
    Criminal_Justice_Police_Science = 'Criminal Justice/Police Science.'
    Gifted_and_Talented_Education = 'Gifted and Talented Education'
    Clinical_Medical_Social_Work = 'Clinical/Medical Social Work.'
    Adult_and_Continuing_Education = 'Adult and Continuing Education'
    Art_History_Criticism_and_Conservation = 'Art History, Criticism and Conservation.'
    Portuguese_Language = 'Portuguese Language'
    Industrial_and_Product_Design = 'Industrial and Product Design'
    Art_Teacher_Education = 'Art Teacher Education.'
    Mechanical_Engineering = 'Mechanical Engineering'
    Polish_Studies = 'Polish Studies'
    Multi_Interdisciplinary_Studies_Other = 'Multi/Interdisciplinary Studies, Other.'
    Interior_Design = 'Interior Design.'
    Slavic_Baltic_and_Albanian_Languages_Literatures_and_Linguistics = 'Slavic, Baltic and Albanian Languages, Literatures, and Linguistics.'
    Art_Art_Studies_General = 'Art/Art Studies, General.'
    Italian_Language_and_Literature = 'Italian Language and Literature'
    Cardiovascular_Technician = 'Cardiovascular Technician'
    Teaching = 'Teaching'
    Emergency_Care_Attendant_EMT_Ambulance = 'Emergency Care Attendant (EMT Ambulance).'
    Physics_Other = 'Physics, Other.'
    Veterinary_Medicine = 'Veterinary Medicine.'
    Physics = 'Physics.'
    Architectural_Engineering = 'Architectural Engineering'
    Disability_Law = 'Disability Law'
    Children_and_Youth_Library_Services = 'Children and Youth Library Services.'
    Materials_Science = 'Materials Science'
    Dance = 'Dance'
    Naval_Engineering = 'Naval Engineering'
    Graphic_Design = 'Graphic Design.'
    Musicology_and_Ethnomusicology = 'Musicology and Ethnomusicology.'
    Library_and_Archives_Assisting = 'Library and Archives Assisting.'
    Scottish_History = 'Scottish History'
    Petroleum_Engineering = 'Petroleum Engineering'
    Work_and_Family_Studies = 'Work and Family Studies.'
    Golf_Industry = 'Golf Industry'
    auto = 'auto'
    Aerospace_Engineering = 'Aerospace Engineering'
    International_Business = 'International Business'
    Advertising = 'Advertising.'
    Disability_Studies = 'Disability Studies.'
    Cyber_Electronic_Operations_and_Warfare = 'Cyber/Electronic Operations and Warfare.'
    Investments_and_Securities = 'Investments and Securities.'
    Drawing = 'Drawing'
    Dramatic_Theatre_Arts_and_Stagecraft_Other = 'Dramatic/Theatre Arts and Stagecraft, Other.'
    Manufacturing_Technology = 'Manufacturing Technology.'
    Military_Science = 'Military Science'
    British_Studies = 'British Studies'
    Fine_Arts_and_Art_Studies_Other = 'Fine Arts and Art Studies, Other.'
    Systems_Engineering = 'Systems Engineering'
    Foods_Nutrition_and_Wellness_Studies = 'Foods, Nutrition, and Wellness Studies'
    General_Office_Occupations_and_Clerical_Services = 'General Office Occupations and Clerical Services.'
    Naval_Architecture_and_Marine_Engineering = 'Naval Architecture and Marine Engineering.'
    Agroecology_and_Sustainable_Agriculture = 'Agroecology and Sustainable Agriculture.'
    Pharmacology_and_Toxicology = 'Pharmacology and Toxicology.'
    High_School_Education = 'High School Education'
    Business_Libraries_and_Librarianship = 'Business Libraries and Librarianship'
    Photography = 'Photography.'
    Art_History = 'Art History'
    Plumbing_Technology_Plumber = 'Plumbing Technology/Plumber.'
    Industrial_Engineering = 'Industrial Engineering'
    Licensed_Practical_Vocational_Nurse_Training_LPN_LVN_Cert = 'Licensed Practical/Vocational Nurse Training (LPN, LVN, Cert.'
    Spanish_Language_Teacher_Education = 'Spanish Language Teacher Education.'
    History_General = 'History, General.'
    Marine_Biology_and_Biological_Oceanography = 'Marine Biology and Biological Oceanography.'
    Real_Estate_Law = 'Real Estate Law'
    Public_Administration = 'Public Administration.'
    Registered_Nursing_Registered_Nurse = 'Registered Nursing/Registered Nurse.'
    Mechanical_Engineering = 'Mechanical Engineering.'
    Literature = 'Literature.'
    Sports_Management_and_Leisure_Studies = 'Sports Management and Leisure Studies'
    Scottish_Language = 'Scottish Language'
    Pre_Nursing_Studies = 'Pre-Nursing Studies.'
    Rehabilitation_and_Therapeutic_Professions = 'Rehabilitation and Therapeutic Professions.'
    Sign_Language_Interpretation_and_Translation = 'Sign Language Interpretation and Translation.'
    Health_Care_Law = 'Health Care Law'
    Clinical_Medical_Laboratory_Science_Research_and_Allied_Professions = 'Clinical/Medical Laboratory Science/Research and Allied Professions.'
    Interior_Architecture = 'Interior Architecture.'
    Engineering = 'Engineering'
    Dental_Clinical_Sciences_General = 'Dental Clinical Sciences, General.'
    Pharmacy = 'Pharmacy'
    Construction_Trades_General = 'Construction Trades, General.'
    Public_Service = 'Public Service'
    Hawaiian_Language = 'Hawaiian Language'
    Mechanical_Drafting_and_Mechanical_Drafting_CAD_CADD = 'Mechanical Drafting and Mechanical Drafting CAD/CADD.'
    Clinical_Laboratory_Science_Medical_Technology_Technologist = 'Clinical Laboratory Science/Medical Technology/Technologist.'
    Construction_and_Heavy_Equipment_Operation = 'Construction and Heavy Equipment Operation'
    Music = 'Music'
    Culinary_Arts = 'Culinary Arts'
    Japanese_Language_and_Literature = 'Japanese Language and Literature.'
    Vacuum_sciences = 'Vacuum sciences'
    Adolescents = 'Adolescents'
    Military_History = 'Military History'
    Taxation = 'Taxation'
    Engineering_Physics = 'Engineering Physics'
    Family_Medicine = 'Family Medicine.'
    Computer_Systems_Technician = 'Computer Systems Technician'
    Surveying_Engineering = 'Surveying Engineering'
    Optical_Engineering = 'Optical Engineering'
    Creative_Arts = 'Creative Arts'
    Resource_Management = 'Resource Management'
    Health_and_Physical_Education_Fitness_General = 'Health and Physical Education/Fitness, General.'
    Sports_Communication = 'Sports Communication.'
    Veterinary_Sciences = 'Veterinary Sciences'
    Anatomy = 'Anatomy'
    Nail_Technician = 'Nail Technician'
    Culinary_Arts_and_Food_Service = 'Culinary Arts and Food Service'
    Industrial_Engineering = 'Industrial Engineering.'
    Medical_Insurance_Billing_and_Claims = 'Medical Insurance Billing and Claims'
    Chiropractic = 'Chiropractic.'
    Dental_Hygiene = 'Dental Hygiene'
    Public_Health_Medicine = 'Public Health Medicine.'
    Game_Design_and_Interactive_Media = 'Game Design and Interactive Media'
    Aircraft_Powerplant_Technology_Technician = 'Aircraft Powerplant Technology/Technician.'
    Occupational_and_Environmental_Health_Nursing = 'Occupational and Environmental Health Nursing.'
    Photography = 'Photography'
    Precision_Production_Trades_General = 'Precision Production Trades, General.'
    Architectural_Engineering_Technologies_Technicians = 'Architectural Engineering Technologies/Technicians.'
    Agronomy = 'Agronomy'
    Machine_Tool_Technology_Machinist = 'Machine Tool Technology/Machinist.'
    Plant_Sciences = 'Plant Sciences.'
    Tourism = 'Tourism'
    Social_Welfare = 'Social Welfare'
    Communication_Disorders = 'Communication Disorders'
    Occupational_Therapy = 'Occupational Therapy'
    Corrections_and_Criminal_Justice_Other = 'Corrections and Criminal Justice, Other.'
    Radiologic_Technology_Science_Radiographer = 'Radiologic Technology/Science - Radiographer.'
    Public_Policy_and_Social_Services = 'Public Policy and Social Services'
    Wine_Steward_Sommelier = 'Wine Steward/Sommelier.'
    Composers_and_Compositions = 'Composers and Compositions'
    Animal_Law = 'Animal Law'
    Agricultural_and_Domestic_Animal_Services = 'Agricultural and Domestic Animal Services.'
    Mental_Health_Counseling = 'Mental Health Counseling'
    Business = 'Business'
    Editors_and_Editing = 'Editors and Editing'
    Physical_Education_Teaching_and_Coaching = 'Physical Education Teaching and Coaching.'
    Drafting_and_Design_Technology_Technician_General = 'Drafting and Design Technology/Technician, General.'
    Political_Science_and_Government = 'Political Science and Government'
    Industrial_Technology_Technician = 'Industrial Technology/Technician.'
    Public_Relations = 'Public Relations'
    Network_Database_and_System_Administration = 'Network, Database, and System Administration'
    Management = 'Management'
    Acting = 'Acting'
    Computer_Software_Engineering = 'Computer Software Engineering.'
    English_and_Writing = 'English and Writing'
    Plant_Sciences_General = 'Plant Sciences, General.'
    Arts_Management = 'Arts Management.'
    Graphic_Design = 'Graphic Design'
    Design = 'Design'
    Health_Teacher_Education = 'Health Teacher Education'
    Boating_Industry = 'Boating Industry'
    Computer_Science = 'Computer Science'
    Speech_Impairments = 'Speech Impairments'
    Alzheimers_Disease = "Alzheimer's Disease"
    Financial_Planning_and_Services = 'Financial Planning and Services.'
    Electrician = 'Electrician.'
    Computer_Systems_Networking_and_Telecommunications = 'Computer Systems Networking and Telecommunications.'
    Evolution = 'Evolution'
    Animal_Sciences_and_Husbandry = 'Animal Sciences and Husbandry'
    Robotics_and_Automation_Engineering_Technician = 'Robotics and Automation Engineering Technician'
    Community_Development = 'Community Development'
    Stringed_Instruments = 'Stringed Instruments.'
    Arts_Entertainment_and_Media_Management_General = 'Arts, Entertainment,and Media Management, General.'
    Insurance = 'Insurance.'
    Computer_Installation_and_Repair = 'Computer Installation and Repair'
    Business_Administration_Management_and_Operations = 'Business Administration, Management and Operations.'
    Architectural_Drafting_and_Architectural_CAD_CADD = 'Architectural Drafting and Architectural CAD/CADD.'
    Fashion_and_Apparel_Merchandising = 'Fashion and Apparel Merchandising'
    Engineering_Science = 'Engineering Science'
    Environmental_Education = 'Environmental Education'
    Business_Commerce_General = 'Business/Commerce, General.'
    Apparel_and_Textiles_General = 'Apparel and Textiles, General.'
    Strategic_Intelligence = 'Strategic Intelligence.'
    Critical_Care_Nursing = 'Critical Care Nursing'
    Fashion_and_Fabric_Consultant = 'Fashion and Fabric Consultant.'
    Ceramic_Engineering = 'Ceramic Engineering'
    Botany_and_Plant_Physiology = 'Botany and Plant Physiology'
    Speech_Communication_and_Rhetoric = 'Speech Communication and Rhetoric.'
    Aeronautics_and_Aviation_Technology = 'Aeronautics and Aviation Technology'
    Technical_and_Business_Writing = 'Technical and Business Writing.'
    Family_and_Consumer_Studies = 'Family and Consumer Studies'
    Aged_and_Aging = 'Aged and Aging'
    Esthetician_and_Skin_Care = 'Esthetician and Skin Care'
    Film_and_Video_Studies = 'Film and Video Studies'
    Phlebotomy_Technician_Phlebotomist = 'Phlebotomy Technician/Phlebotomist.'
    Electrical_Electronics_and_Communications_Engineering_Other = 'Electrical, Electronics and Communications Engineering, Other.'
    Sports_Reporting = 'Sports Reporting'
    Geriatrics_Nursing = 'Geriatrics Nursing'
    Entertainment_Law = 'Entertainment Law'
    CAD_CADD_Drafting_and_or_Design_Technology_Technician = 'CAD/CADD Drafting and/or Design Technology/Technician.'
    Pediatric_Hemato_Oncology = 'Pediatric Hemato-Oncology.'
    Radiology_Nursing = 'Radiology Nursing'
    Philanthropy = 'Philanthropy'
    Architecture = 'Architecture'
    International_Relations_and_Affairs = 'International Relations and Affairs.'
    Alutiiq_culture = 'Alutiiq culture'
    Organ_Transplants = 'Organ Transplants'
    Surgical_Technology_Technologist = 'Surgical Technology/Technologist.'
    Business_and_Management = 'Business and Management'
    Chemistry_General = 'Chemistry, General.'
    Soil_Sciences = 'Soil Sciences.'
    Health_and_Wellness_General = 'Health and Wellness, General.'
    Music_Teacher_Education = 'Music Teacher Education'
    Medical_Assistant = 'Medical Assistant'
    Pharmacy_Pharmaceutical_Sciences_and_Administration = 'Pharmacy, Pharmaceutical Sciences, and Administration.'
    Native_American_Studies = 'Native American Studies'
    Bioinformatics = 'Bioinformatics'
    Substance_Abuse_and_Addiction_Counseling = 'Substance Abuse and Addiction Counseling'
    Music_Management = 'Music Management'
    Dietetics_and_Clinical_Nutrition_Services_Other = 'Dietetics and Clinical Nutrition Services, Other.'
    Dentistry = 'Dentistry.'
    Neuroscience = 'Neuroscience.'
    Physical_Therapy = 'Physical Therapy'
    Physical_Therapy_Therapist = 'Physical Therapy/Therapist.'
    Minority_and_Ethnic_Studies = 'Minority and Ethnic Studies'
    Corporate_Law = 'Corporate Law'
    Internal_Medicine = 'Internal Medicine.'
    Mental_and_Social_Health_Services = 'Mental and Social Health Services'
    Nuclear_Engineering = 'Nuclear Engineering'
    Medical_Social_Work = 'Medical Social Work'
    Computer_Technology_Computer_Systems_Technology = 'Computer Technology/Computer Systems Technology.'
    Apparel_and_Textiles = 'Apparel and Textiles.'
    Heating_Air_Conditioning_Ventilation_and_Refrigeration_Maintenance_Tech_HAC_HACR_HVAC_HVACR = 'Heating, Air Conditioning, Ventilation & Refrigeration Maintenance Tech (HAC, HACR, HVAC, HVACR)'
    Textile_Technology = 'Textile Technology'
    Natural_Resources = 'Natural Resources'
    Anesthesiology_Nursing = 'Anesthesiology Nursing'
    Ecology = 'Ecology'
    Radiologic_Technician = 'Radiologic Technician'
    Classical_Ancient_Mediterranean_and_Near_Eastern_Studies_and_Archaeology = 'Classical, Ancient Mediterranean and Near Eastern Studies and Archaeology.'
    Allied_Health_and_Medical_Assisting_Services = 'Allied Health and Medical Assisting Services.'
    Commercial_and_Advertising_Art = 'Commercial and Advertising Art'
    Water_resources = 'Water resources'
    Cellular_Biology = 'Cellular Biology'
    Manufacturing_Engineering = 'Manufacturing Engineering.'
    Heating_Air_Conditioning_Ventilation_and_Refrigeration_Maintenance_Technology_Technician = 'Heating, Air Conditioning, Ventilation and Refrigeration Maintenance Technology/Technician.'
  
  