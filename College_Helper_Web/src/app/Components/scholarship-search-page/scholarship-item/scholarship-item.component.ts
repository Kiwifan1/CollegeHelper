import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  Scholarship,
  ScholarshipAcademics,
} from 'src/app/Objects/Scholarship/Scholarship';
import { ScholarshipClosedDialogComponent } from '../scholarship-closed-dialog/scholarship-closed-dialog.component';
import { Academics } from 'src/app/Objects/College/Collegeboard/Academics';

@Component({
  selector: 'app-scholarship-item',
  templateUrl: './scholarship-item.component.html',
  styleUrl: './scholarship-item.component.scss',
})
export class ScholarshipItemComponent implements OnInit {
  @Input() scholarship!: Scholarship;

  constructor(private dialog: MatDialog, private route: Router) {}

  ngOnInit(): void {}

  anyRequired() {
    return (
      this.scholarship.isEssayRequired ||
      this.scholarship.isNeedBased ||
      this.scholarship.isMeritBased
    );
  }

  handleViewDetails() {
    if (this.isWithinDate()) {
      this.route.navigate(['scholarship', this.scholarship.id]);
    } else {
      this.dialog.open(ScholarshipClosedDialogComponent, {
        data: {
          openDate: this.scholarship.scholarshipOpen,
          closeDate: this.scholarship.scholarshipDeadline,
          id: this.scholarship.id,
        },
      });
    }
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

  getGPA(academics: ScholarshipAcademics[]) {
    // there might be a minimum and a maximum, or just a minimum, nor neither
    let minGPA = 0;
    let maxGPA = 0;

    academics.forEach((academic) => {
      if (academic.academicEligibility === 'Minimum GPA') {
        minGPA = academic.academicEligibilityValue;
      }
      if (academic.academicEligibility === 'Maximum GPA') {
        maxGPA = academic.academicEligibilityValue;
      }
    });

    if (minGPA != 0 && maxGPA != 0) {
      return `GPA: ${minGPA.toPrecision(2)} - ${maxGPA.toPrecision(2)}`;
    } else if (minGPA != 0) {
      return `GPA: ${minGPA.toPrecision(2)}`;
    } else if (maxGPA != 0) {
      return `GPA: ${maxGPA.toPrecision(2)}`;
    } else {
      return 'GPA: N/A';
    }
  }
}
