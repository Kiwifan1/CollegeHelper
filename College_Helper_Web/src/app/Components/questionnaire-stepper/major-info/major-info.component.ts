import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-major-info',
  templateUrl: './major-info.component.html',
  styleUrl: './major-info.component.scss',
})
export class MajorInfoComponent implements OnInit {
  @Input() basicMajorPreferencesForm!: FormGroup;
  @Input() advancedMajorPreferencesForm!: FormGroup;

  majors = [
    'Aerospace Engineering',
    'Agricultural Engineering',
    'Biomedical Engineering',
    'Chemical Engineering',
    'Civil Engineering',
    'Computer Engineering',
    'Electrical Engineering',
    'Environmental Engineering',
    'Industrial Engineering',
    'Materials Engineering',
    'Mechanical Engineering',
    'Nuclear Engineering',
  ];

  filteredMajors = of(this.majors);
  searchForm: FormControl = new FormControl('');

  constructor() {}

  ngOnInit(): void {
    this.searchForm.valueChanges.subscribe((value) => {
      this.filterMajors();
    });
  }

  selectMajor(major: string) {
    this.basicMajorPreferencesForm.patchValue({
      majors: major,
    });
  }

  filterMajors() {
    const searchValue = this.searchForm.value.toLowerCase();
    this.filteredMajors = of(
      this.majors.filter((major) => major.toLowerCase().includes(searchValue))
    );
  }
}
