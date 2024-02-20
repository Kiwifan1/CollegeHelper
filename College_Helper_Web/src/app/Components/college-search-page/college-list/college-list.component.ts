import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Observable, filter, of } from 'rxjs';
import { College, testCollege } from 'src/app/Objects/College/College';

@Component({
  selector: 'app-college-list',
  templateUrl: './college-list.component.html',
  styleUrl: './college-list.component.scss',
})
export class CollegeListComponent implements OnInit {
  @Output() collegeSelected = new EventEmitter<College>();

  colleges: College[] = [
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
    testCollege,
    testCollege,
    testCollege,
    testCollege,
    testCollege,
    testCollege,
  ];

  filteredColleges = of(this.colleges);

  selectedCollege!: College;

  // for search bar
  searchForm: FormControl = new FormControl('');

  constructor() {}

  ngOnInit(): void {
    this.searchForm.valueChanges.subscribe((value) => {
      this.filteredColleges = this.filterColleges(value);
    });
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

  selectCollege(college: College) {
    this.selectedCollege = college;
    this.collegeSelected.emit(this.selectedCollege);
  }
}
