import { Component, OnInit } from '@angular/core';
import { College } from 'src/app/Objects/College/College';
import { LoadingService } from 'src/app/Services/loading.service';

@Component({
  selector: 'app-college-search-page',
  templateUrl: './college-search-page.component.html',
  styleUrl: './college-search-page.component.scss',
})
export class CollegeSearchPageComponent implements OnInit {
  constructor() {}

  selectedCollege!: College;
  ngOnInit(): void {}

  onCollegeSelected(college: College) {
    this.selectedCollege = college;
  }
}
