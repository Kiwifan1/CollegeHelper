import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Scholarship } from 'src/app/Objects/Scholarship/Scholarship';
import { LoadingService } from 'src/app/Services/loading.service';
import { EndpointErrorSnackbarComponent } from '../common/endpoint-error-snackbar/endpoint-error-snackbar.component';

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
    private loadingService: LoadingService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getScholarship();
  }

  getScholarship() {
    this.loadingService.updateLoadingStatus(true);
    this.route.data.subscribe({
      next: (data: any) => {
        data.scholarship.scholarshipName =
          data.scholarship.scholarshipName.replace('_', '/');
        this.scholarship = data.scholarship;
        this.loadingService.updateLoadingStatus(false);
      },
      error: (error) => {
        this.loadingService.updateLoadingStatus(false);
        this.snackBar.openFromComponent(EndpointErrorSnackbarComponent, {
          duration: 5000,
          data: error,
        });
      },
    });
  }

  getAwardAmount(scholarship: Scholarship) {
    if (scholarship.awardMin === null || scholarship.awardMax === null) {
      return 'Not Available';
    }
    if (scholarship.awardMin === scholarship.awardMax) {
      return `$${scholarship.awardMin}`;
    } else {
      return `$${scholarship.awardMin} - $${scholarship.awardMax}`;
    }
  }

  isWithinDate() {
    let startDate = this.scholarship.scholarshipOpen;
    let endDate = this.scholarship.scholarshipDeadline;
    let today = new Date();
    let start = new Date(startDate);
    let end = new Date(endDate);

    return today >= start && today <= end;
  }
}
