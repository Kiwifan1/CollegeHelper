import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ScholarshipService } from 'src/app/Services/scholarship.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
})
export class ReviewComponent implements OnInit {
  @Input() userForm!: FormGroup;

  userInfoForm!: FormGroup;
  userScoreForm!: FormGroup;
  userMajorsForm!: FormGroup;
  userInterestsForm!: FormGroup;
  userCollegeForm!: FormGroup;

  @Output() submitQuestionnaire: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.userInfoForm = this.userForm.get('userInfo') as FormGroup;
    this.userScoreForm = this.userForm.get('userScores') as FormGroup;
    this.userMajorsForm = this.userForm.get('userMajors') as FormGroup;
    this.userInterestsForm = this.userForm.get('userInterests') as FormGroup;
    this.userCollegeForm = this.userForm.get('userCollege') as FormGroup;
  }

  submitForms() {
    this.submitQuestionnaire.emit('complete');
  }
}
