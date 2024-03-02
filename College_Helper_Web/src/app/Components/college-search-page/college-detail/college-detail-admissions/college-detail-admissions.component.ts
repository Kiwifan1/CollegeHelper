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

  gpaRanges: string[] = [
    '3.75+',
    '3.5-3.74',
    '3.25-3.49',
    '3.0-3.24',
    '2.5-2.99',
    '2.0-2.49',
    'Below 2.0',
  ];

  gpaValues!: any[];

  constructor() {}

  ngOnInit(): void {
    this.gpaValues = this.college.admissions.gpaRange;
  }

  getAdmissions() {
    return this.college.admissions;
  }

  getAcademics() {
    return this.college.academics;
  }

  getValue(num: number | null) {
    if (num && num == -1) {
      return 'Not Available';
    }
    return num;
  }
}
