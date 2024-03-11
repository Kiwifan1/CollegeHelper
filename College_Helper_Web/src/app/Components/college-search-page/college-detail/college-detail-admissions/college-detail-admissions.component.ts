import { Component, Input, OnInit } from '@angular/core';
import { College } from 'src/app/Objects/College/College';
import { Admissions } from 'src/app/Objects/College/Collegeboard/Admissions';

@Component({
  selector: 'app-college-detail-admissions',
  templateUrl: './college-detail-admissions.component.html',
  styleUrl: '../college-detail.component.scss',
})
export class CollegeDetailAdmissionsComponent implements OnInit {
  @Input() college!: College;

  constructor() {}

  ngOnInit(): void {}

  getAdmissions() {
    return this.college.admissionsInfo;
  }

  getSatScores() {
    return this.college.satScores;
  }

  getSatCompositeScores() {
    return this.college.satCompositeScores;
  }

  getActScores() {
    return this.college.actScores;
  }
  
  handleScores(
    num1: number | null | undefined,
    num2: number | null | undefined
  ) {
    if (!num1 || num1 == -1 || !num2 || num2 == -1) {
      return 'Not Available';
    }
    return num1 + ' - ' + num2;
  }

  getValue(num: number | null | undefined) {
    if (!num || num == -1) {
      return 'Not Available';
    }
    return num;
  }
}
