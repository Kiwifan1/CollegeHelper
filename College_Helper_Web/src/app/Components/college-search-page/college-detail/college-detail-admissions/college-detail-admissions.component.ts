import { Component, Input, OnInit } from '@angular/core';
import { College } from 'src/app/Objects/College/College';
import { Admissions } from 'src/app/Objects/College/Collegeboard/Admissions';
import { CollegeBoard } from 'src/app/Objects/College/Collegeboard/CollegeBoard';

@Component({
  selector: 'app-college-detail-admissions',
  templateUrl: './college-detail-admissions.component.html',
  styleUrl: '../college-detail.component.scss',
})
export class CollegeDetailAdmissionsComponent implements OnInit {
  @Input() college!: College;

  gpaRangesMap: Map<string, string> = new Map([
    ['Below 2.0', 'Below 2.0'],
    ['2.0-2.49', '2.0-2.49'],
    ['2.5-2.99', '2.5-2.99'],
    ['3.0-3.24', '3.0-3.24'],
    ['3.25-3.49', '3.25-3.49'],
    ['3.5-3.74', '3.5-3.74'],
    ['3.75+', '3.75+'],
  ]);

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
    this.gpaValues = [
      this.college.collegeBoard?.admissions.gpaRange['3.75'],
      this.college.collegeBoard?.admissions.gpaRange['3.5'],
      this.college.collegeBoard?.admissions.gpaRange['3.25'],
      this.college.collegeBoard?.admissions.gpaRange['3.0'],
      this.college.collegeBoard?.admissions.gpaRange['2.5'],
      this.college.collegeBoard?.admissions.gpaRange['2.0'],
      this.college.collegeBoard?.admissions.gpaRange['0.0'],
    ];
    for (let i = 0; i < this.gpaValues.length; i++) {
      if (this.gpaValues[i] != -1) {
        this.gpaValues[i] = this.gpaValues[i]?.toString() + '%';
        this.gpaRangesMap.set(
          this.gpaRangesMap.get(Array.from(this.gpaRangesMap.keys())[i])!,
          this.gpaValues[i]
        );
      } else {
        this.gpaValues[i] = 'Not Available';
        this.gpaRangesMap.set(
          this.gpaRangesMap.get(Array.from(this.gpaRangesMap.keys())[i])!,
          this.gpaValues[i]
        );
      }
    }
  }

  getAdmissions() {
    return this.college.collegeBoard?.admissions;
  }

  getAcademics() {
    return this.college.collegeBoard?.academics;
  }

  sortedGpaRanges() {
    return Array.from(this.gpaRangesMap.keys()).reverse();
  }

  getValue(num: number | undefined) {
    if (num && num == -1) {
      return 'Not Available';
    }
    return num;
  }
}
