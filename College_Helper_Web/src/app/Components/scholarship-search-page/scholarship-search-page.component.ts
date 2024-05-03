import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Scholarship } from 'src/app/Objects/Scholarship/Scholarship';
import { LoadingService } from 'src/app/Services/loading.service';
import { ScholarshipService } from 'src/app/Services/scholarship.service';
import { ScholarshipSearchDialogComponent } from './scholarship-search-dialog/scholarship-search-dialog.component';
import { User } from 'src/app/Objects/User/User';
import { AuthService } from 'src/app/Services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EndpointErrorSnackbarComponent } from '../common/endpoint-error-snackbar/endpoint-error-snackbar.component';
import { switchMap } from 'rxjs';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';

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

  min: number = 0;
  max: number = 0;
  minChoice: number = 0;
  maxChoice: number = 0;
  meritBased: string = 'Either';
  needBased: string = 'Either';
  essayRequired: string = 'Either';
  applicationFee: string = 'Either';
  sort_by_match = true;

  user_id: string = '';
  filters: any = {
    similarityMatch: this.sort_by_match,
  };

  similarityMatchingInProgess: boolean = false;

  constructor(
    private authService: AuthService,
    private scholarshipService: ScholarshipService,
    private loadingService: LoadingService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.user_id = this.authService.getUser().id;
    this.filters.id = this.user_id;
  }

  ngOnInit() {
    this.onPaginate({
      pageIndex: this.pageIndex * this.pageSize,
      pageSize: this.pageSize,
    });

    this.scholarshipService.getScholarshipAwardAmounts(this.filters).subscribe({
      next: (data: any) => {
        this.min = data.min;
        this.max = data.max;
      },
      error: (error) => {
        this.loadingService.updateLoadingStatus(false);
        this.snackBar.openFromComponent(EndpointErrorSnackbarComponent, {
          duration: 5000,
          data: { error: error.error },
        });
      },
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
      .subscribe({
        next: (data: any) => {
          this.length = data.num_returned;
          let scholarships = data.scholarships;
          scholarships.forEach((scholarship: any) => {
            scholarship.scholarshipName = scholarship.scholarshipName.replace(
              '_',
              '/'
            );
          });
          this.scholarships = scholarships;
          this.similarityMatchingInProgess = !data.found_scores;
          this.loadingService.updateLoadingStatus(false);
        },
        error: (error) => {
          this.loadingService.updateLoadingStatus(false);
          this.snackBar.openFromComponent(EndpointErrorSnackbarComponent, {
            duration: 5000,
            data: { error: error.error },
          });
        },
      });
  }

  openSeachDialog() {
    this.dialog
      .open(ScholarshipSearchDialogComponent, {
        width: '500px',
        data: {
          min: this.min,
          max: this.max,
          minChoice: this.minChoice,
          maxChoice: this.maxChoice,
          applicationFee: this.applicationFee,
          essayRequired: this.essayRequired,
          meritBased: this.meritBased,
          needBased: this.needBased,
          similarityMatch: this.sort_by_match,
        },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            console.log(result);
            this.filters = {
              ...this.filters,
              ...result,
            };

            this.minChoice = result.minAmount;
            this.maxChoice = result.maxAmount;
            this.essayRequired = result.essayRequired;
            this.meritBased = result.meritBased;
            this.needBased = result.needBased;
            this.sort_by_match = result.similarityMatch;
            this.applicationFee = result.applicationFee;
            this.loadingService.updateLoadingStatus(true);
            this.scholarshipService
              .getScholarshipAwardAmounts(this.filters)
              .pipe(
                switchMap((data: any) => {
                  this.min = data.min;
                  this.max = data.max;
                  return this.scholarshipService.getScholarships(
                    0,
                    this.pageSize,
                    this.filters
                  );
                })
              )
              .subscribe({
                next: (data: any) => {
                  this.length = data.num_returned;
                  let scholarships = data.scholarships;
                  scholarships.forEach((scholarship: any) => {
                    scholarship.scholarshipName =
                      scholarship.scholarshipName.replace('_', '/');
                  });
                  this.scholarships = scholarships;
                  this.similarityMatchingInProgess = !data.found_scores;
                  this.loadingService.updateLoadingStatus(false);
                },
                error: (error) => {
                  this.loadingService.updateLoadingStatus(false);
                  this.snackBar.openFromComponent(
                    EndpointErrorSnackbarComponent,
                    {
                      duration: 5000,
                      data: { error: error.error },
                    }
                  );
                },
              });
          }
        },
        error: (error) => {
          this.loadingService.updateLoadingStatus(false);
          this.snackBar.openFromComponent(EndpointErrorSnackbarComponent, {
            duration: 5000,
            data: { error: error.error },
          });
        },
      });
  }
}
