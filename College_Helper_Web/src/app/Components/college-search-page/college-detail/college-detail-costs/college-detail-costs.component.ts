import { Component, Input, OnInit } from '@angular/core';
import { College } from 'src/app/Objects/College/College';

@Component({
  selector: 'app-college-detail-costs',
  templateUrl: './college-detail-costs.component.html',
  styleUrl: '../college-detail.component.scss',
})
export class CollegeDetailCostsComponent implements OnInit {
  @Input() college!: College;

  constructor() {}

  ngOnInit(): void {
  }

  getCost() {
    return this.college.financialInfo;
  }

  getValue(value: number | undefined | null) {
    if (value && value == -1) {
      return 'Not Available';
    }
    return value;
  }
}
