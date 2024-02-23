import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-career-info',
  templateUrl: './career-info.component.html',
  styleUrl: './career-info.component.scss',
})
export class CareerInfoComponent implements OnInit {
  @Input() basicCareerPreferencesForm!: FormGroup;
  @Input() advancedCareerPreferencesForm!: FormGroup;

  careers = [
    'Software Developer',
    'Computer Systems Analyst',
    'IT Manager',
    'Database Administrator',
    'Web Developer',
    'Computer Network Architect',
    'Computer Systems Administrator',
    'Computer Programmer',
    'Network and Computer Systems Administrator',
    'Computer Network Support Specialist',
  ];

  filteredCareers = of(this.careers);

  searchForm: FormControl = new FormControl('');

  constructor() {}

  ngOnInit(): void {
    this.searchForm.valueChanges.subscribe((value) => {
      this.filterChange();
    });
  }

  selectCareer(careerName: string) {
    // add career to form which is list of careers
    this.basicCareerPreferencesForm.patchValue({
      careers: [...this.basicCareerPreferencesForm.value.careers, careerName],
    });
  }

  filterChange() {
    this.filteredCareers = this.filterCareers(this.searchForm.value);
  }

  filterCareers(value: string) {
    let filteredCareers: string[] = [];
    this.careers.forEach((career) => {
      if (career.toLowerCase().includes(value.toLowerCase())) {
        filteredCareers.push(career);
      }
    });
    return of(filteredCareers);
  }
}
