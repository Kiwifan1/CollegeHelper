import { Component, OnInit } from '@angular/core';
import { Scholarship } from 'src/app/Objects/Scholarship/Scholarship';
import { LoadingService } from 'src/app/Services/loading.service';
import { ScholarshipService } from 'src/app/Services/scholarship.service';

@Component({
  selector: 'app-scholarship-search-page',
  templateUrl: './scholarship-search-page.component.html',
  styleUrl: './scholarship-search-page.component.scss',
})
export class ScholarshipSearchPageComponent implements OnInit {
  scholarships: Scholarship[] = [];
  pageSize = 10;
  pageIndex = 0;
  length = 0;
  pageSizeOptions = [5, 10, 25, 100];

  constructor(
    private scholarshipService: ScholarshipService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.totalScholarships();
    this.onPaginate({
      pageIndex: this.pageIndex * this.pageSize,
      pageSize: this.pageSize,
    });
  }

  onPaginate($event: any) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.loadingService.updateLoadingStatus(true);
    this.scholarshipService
      .getScholarships(this.pageIndex * this.pageSize, this.pageSize)
      .subscribe((scholarships: any) => {
        scholarships.forEach((scholarship: any) => {
          scholarship.scholarshipName = scholarship.scholarshipName.replace(
            '_',
            '/'
          );
        });
        this.scholarships = scholarships;
        this.loadingService.updateLoadingStatus(false);
      });
  }

  totalScholarships() {
    this.loadingService.updateLoadingStatus(true);
    this.scholarshipService.getNumScholarships().subscribe((num: any) => {
      this.length = num.length;
      this.loadingService.updateLoadingStatus(false);
    });
  }
}
