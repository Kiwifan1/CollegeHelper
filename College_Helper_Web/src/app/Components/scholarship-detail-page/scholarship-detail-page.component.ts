import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Scholarship } from 'src/app/Objects/Scholarship/Scholarship';
import { LoadingService } from 'src/app/Services/loading.service';

@Component({
  selector: 'app-scholarship-detail-page',
  templateUrl: './scholarship-detail-page.component.html',
  styleUrl: './scholarship-detail-page.component.scss',
})
export class ScholarshipDetailPageComponent implements OnInit {
  scholarship: Scholarship = {} as Scholarship;
  requirements: string[] = [];
  constructor(
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.getScholarship();
  }

  getScholarship() {
    this.route.data.subscribe((data: any) => {
      data.scholarship.scholarshipName =
        data.scholarship.scholarshipName.replace('_', '/');
      this.scholarship = data.scholarship;
      this.loadingService.updateLoadingStatus(false);
    });
  }

  isWithinDate() {
    let startDate = this.scholarship.scholarshipOpen.split('/');
    let endDate = this.scholarship.scholarshipDeadline.split('/');

    let start = new Date(
      Number(startDate[2]),
      Number(startDate[0]) - 1,
      Number(startDate[1])
    );
    let end = new Date(
      Number(endDate[2]),
      Number(endDate[0]) - 1,
      Number(endDate[1])
    );
    let today = new Date();

    return today >= start && today <= end;
  }
}
