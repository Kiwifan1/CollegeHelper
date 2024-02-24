import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
})
export class ReviewComponent implements OnInit {
  @Input() userGeneralInfoForm!: FormGroup;
  @Input() userScoreInfoForm!: FormGroup;
  @Input() userBasicCollegePreferencesForm!: FormGroup;
  @Input() userAdvancedCollegePreferencesForm!: FormGroup;
  @Input() userBasicMajorPreferencesForm!: FormGroup;
  @Input() userAdvancedMajorPreferencesForm!: FormGroup;
  @Input() userBasicCareerPreferencesForm!: FormGroup;
  @Input() userAdvancedCareerPreferencesForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
  }
}
