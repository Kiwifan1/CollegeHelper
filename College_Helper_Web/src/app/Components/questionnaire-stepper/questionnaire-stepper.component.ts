import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gender } from 'src/app/Objects/User/Demographics';

@Component({
  selector: 'app-questionnaire-stepper',
  templateUrl: './questionnaire-stepper.component.html',
  styleUrl: './questionnaire-stepper.component.scss',
})
export class QuestionnaireStepperComponent implements OnInit {
  // all information is not required, but will be helpful for the user

  userGeneralInfoForm: FormGroup = new FormGroup({
    age: new FormControl(''),
    gender: new FormControl(Gender),
    ethnicity: new FormControl(''),
    nationality: new FormControl(''),
    educationLevel: new FormControl(''),
    occupation: new FormControl(''),
    incomeLevel: new FormControl(''),
    maritalStatus: new FormControl(''),
    location: new FormControl(''),
  });

  userScoreInfoForm: FormGroup = new FormGroup({
    SAT: new FormControl(''),
    ACT: new FormControl(''),
    GPA: new FormControl(''),
    AP: new FormControl(''),
    IB: new FormControl(''),
    PSAT10: new FormControl(''),
    NMSQT: new FormControl(''),
  });

  userBasicCollegePreferencesForm: FormGroup = new FormGroup({
    colleges: new FormControl(['']),
  });

  userBasicMajorPreferencesForm: FormGroup = new FormGroup({
    majors: new FormControl(['']),
  });

  userBasicCareerPreferencesForm: FormGroup = new FormGroup({
    careers: new FormControl(['']),
  });

  userCurrentCoursesForm: FormGroup = new FormGroup({
    currentCourses: new FormControl(['']),
  });

  // advanced are optional, and will be used to help further specify the areas

  userAdvancedCollegePreferencesForm: FormGroup = new FormGroup({
    collegeSize: new FormControl(''),
    collegeLocation: new FormControl(''),
    collegeCost: new FormControl(''),
    collegeSports: new FormControl(''),
    collegeClubs: new FormControl(''),
    collegeGreekLife: new FormControl(''),
  });

  userAdvancedMajorPreferencesForm: FormGroup = new FormGroup({
    majorType: new FormControl(''),
    majorLocation: new FormControl(''),
  });

  userAdvancedCareerPreferencesForm: FormGroup = new FormGroup({
    careerType: new FormControl(''),
    careerLocation: new FormControl(''),
    careerSalary: new FormControl(''),
    careerHours: new FormControl(''),
    careerBenefits: new FormControl(''),
    careerWorkLife: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}
}
