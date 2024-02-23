import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-score-info',
  templateUrl: './score-info.component.html',
  styleUrl: './score-info.component.scss',
})
export class ScoreInfoComponent implements OnInit {
  @Input() userScoreInfoForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  invalidSAT(): boolean {
    return this.userScoreInfoForm.controls['SAT'].invalid;
  }

  invalidACT(): boolean {
    return this.userScoreInfoForm.controls['ACT'].invalid;
  }

  invalidGPA(): boolean {
    return this.userScoreInfoForm.controls['GPA'].invalid;
  }

  invalidPSAT10(): boolean {
    return this.userScoreInfoForm.controls['PSAT10'].invalid;
  }

  invalidNMSQT(): boolean {
    return this.userScoreInfoForm.controls['NMSQT'].invalid;
  }
}
