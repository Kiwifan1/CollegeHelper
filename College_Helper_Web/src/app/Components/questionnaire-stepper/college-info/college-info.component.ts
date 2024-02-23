import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { College, testCollege } from 'src/app/Objects/College/College';

@Component({
  selector: 'app-college-info',
  templateUrl: './college-info.component.html',
  styleUrl: './college-info.component.scss',
})
export class CollegeInfoComponent implements OnInit {
  @Input() basicCollegeInfoForm!: FormGroup;
  @Input() advancedCollegeInfoForm!: FormGroup;

  colleges = [
    testCollege,
    testCollege,
    testCollege,
    testCollege,
    testCollege,
    testCollege,
    testCollege,
    testCollege,
    testCollege,
    testCollege,
  ];

  collegeNames: string[] = this.colleges.map((college) => college.name);

  filteredColleges = of(this.colleges);
  searchForm: FormControl = new FormControl('');

  constructor() {}

  ngOnInit(): void {
    this.searchForm.valueChanges.subscribe((value) => {
      this.filterChange();
    });
  }

  selectCollege(collegeName: string) {
    // add college to form which is list of colleges
    this.basicCollegeInfoForm.patchValue({
      colleges: [...this.basicCollegeInfoForm.value.colleges, collegeName]
    });
  }

  filterChange() {
    this.filteredColleges = this.filterColleges(this.searchForm.value);
  }

  filterColleges(value: string) {
    let filteredColleges: College[] = [];
    this.colleges.forEach((college) => {
      if (college.name.toLowerCase().includes(value.toLowerCase())) {
        filteredColleges.push(college);
      }
    });
    return of(filteredColleges);
  }
}
