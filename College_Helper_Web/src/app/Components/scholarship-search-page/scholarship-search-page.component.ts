import { Component, OnInit } from '@angular/core';
import { ScholarshipService } from 'src/app/Services/scholarship.service';

@Component({
  selector: 'app-scholarship-search-page',
  templateUrl: './scholarship-search-page.component.html',
  styleUrl: './scholarship-search-page.component.scss',
})
export class ScholarshipSearchPageComponent implements OnInit {
  constructor(private scholarshipService: ScholarshipService) {}
  scholarships: any[] = [];
  ngOnInit() {
    this.scholarshipService.getScholarships().subscribe((scholarships: any) => {
      this.scholarships = scholarships;
      console.log(this.scholarships)
    });
  }
}
