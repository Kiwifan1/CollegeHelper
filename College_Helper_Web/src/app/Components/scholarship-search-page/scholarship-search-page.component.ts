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
    if (!localStorage.getItem('scholarships')) {
      this.scholarshipService
        .getScholarships()
        .subscribe((scholarships: any) => {
          scholarships.forEach((scholarship: any) => {
            scholarship.name = scholarship.name.replace('_', '/');
          });
          this.scholarships = scholarships;

          localStorage.setItem('scholarships', JSON.stringify(scholarships));
        });
    } else {
      this.scholarships = JSON.parse(localStorage.getItem('scholarships')!);
    }
  }
}
