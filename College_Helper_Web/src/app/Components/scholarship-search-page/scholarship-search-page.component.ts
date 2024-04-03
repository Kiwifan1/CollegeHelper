import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Scholarship } from 'src/app/Objects/Scholarship/Scholarship';
import { LoadingService } from 'src/app/Services/loading.service';
import { ScholarshipService } from 'src/app/Services/scholarship.service';
import { ScholarshipSearchDialogComponent } from './scholarship-search-dialog/scholarship-search-dialog.component';
import { User } from 'src/app/Objects/User/User';
import { AuthService } from 'src/app/Services/auth.service';

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

  minChoice: number = 0;
  maxChoice: number = 0;
  meritBased: string = 'Either';
  needBased: string = 'Either';
  essayRequired: string = 'Either';
  sort_by_match = true;

  user_id: string = '';
  filters: any = {
    sort_by_match: this.sort_by_match,
  };

  constructor(
    private authService: AuthService,
    private scholarshipService: ScholarshipService,
    private loadingService: LoadingService,
    private dialog: MatDialog
  ) {
    this.user_id = authService.getUser().id;
    this.filters.id = this.user_id;
  }

  ngOnInit() {
    // this.totalScholarships();
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
      .getScholarships(
        this.pageIndex * this.pageSize,
        this.pageSize,
        this.filters
      )
      .subscribe((data: any) => {
        this.length = data.num_returned;
        let scholarships = data.scholarships;
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
    this.scholarshipService
      .getNumScholarships(this.filters)
      .subscribe((num: any) => {
        this.length = num.length;
        this.loadingService.updateLoadingStatus(false);
      });
  }

  openSeachDialog() {
    this.dialog
      .open(ScholarshipSearchDialogComponent, {
        width: '500px',
        data: {
          minChoice: this.minChoice,
          maxChoice: this.maxChoice,
          essayRequired: this.essayRequired,
          meritBased: this.meritBased,
          needBased: this.needBased,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.filters = {
            ...this.filters,
            ...result,
          };

          console.log(result)

          this.minChoice = result.minAmount;
          this.maxChoice = result.maxAmount;
          this.essayRequired = result.essayRequired;
          this.meritBased = result.meritBased;
          this.needBased = result.needBased;

          this.loadingService.updateLoadingStatus(true);
          this.scholarshipService
            .getScholarships(0, this.pageSize, this.filters)
            .subscribe((data: any) => {
              this.length = data.num_returned;
              let scholarships = data.scholarships;
              scholarships.forEach((scholarship: any) => {
                scholarship.scholarshipName =
                  scholarship.scholarshipName.replace('_', '/');
              });
              this.scholarships = scholarships;
              this.loadingService.updateLoadingStatus(false);
            });
        }
      });
  }
}
