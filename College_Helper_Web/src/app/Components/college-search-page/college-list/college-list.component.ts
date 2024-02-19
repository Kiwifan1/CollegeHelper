import { Component, OnInit } from '@angular/core';
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

  constructor() {}

  ngOnInit(): void {}
}
