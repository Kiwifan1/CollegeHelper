import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output() submitQuestionnaire: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  submitForms() {
    this.submitQuestionnaire.emit('complete');
  }
}
