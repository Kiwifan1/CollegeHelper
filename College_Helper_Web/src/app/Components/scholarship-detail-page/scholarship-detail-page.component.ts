import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scholarship-detail-page',
  templateUrl: './scholarship-detail-page.component.html',
  styleUrl: './scholarship-detail-page.component.scss',
})
export class ScholarshipDetailPageComponent implements OnInit {
  scholarship: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getScholarship();
  }

  getScholarship() {
    this.route.data.subscribe((data: any) => {
      data.scholarship.name = data.scholarship.name.replace('_', '/');
      this.scholarship = data.scholarship;
      console.log(this.scholarship);
    });
  }

  isWithinDate() {
    let startDate = this.scholarship.open_date.split('/');
    let endDate = this.scholarship.close_date.split('/');

    let start = new Date(startDate[2], startDate[0] - 1, startDate[1]);
    let end = new Date(endDate[2], endDate[0] - 1, endDate[1]);
    let today = new Date();

    return today >= start && today <= end;
  }
}
