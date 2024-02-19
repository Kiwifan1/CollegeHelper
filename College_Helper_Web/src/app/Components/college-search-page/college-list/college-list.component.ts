import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { College, testCollege } from 'src/app/Objects/College/College';

@Component({
  selector: 'app-college-list',
  templateUrl: './college-list.component.html',
  styleUrl: './college-list.component.scss',
})
export class CollegeListComponent implements OnInit {
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

  selectedCollege!: College;

  @Output() collegeSelected = new EventEmitter<College>();

  constructor() {}

  ngOnInit(): void {}

  selectCollege(college: College) {
    this.selectedCollege = college;
    this.collegeSelected.emit(college);
  }
}
