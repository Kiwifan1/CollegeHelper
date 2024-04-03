import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ScholarshipService } from 'src/app/Services/scholarship.service';

@Component({
  selector: 'app-scholarship-search-dialog',
  templateUrl: './scholarship-search-dialog.component.html',
  styleUrl: './scholarship-search-dialog.component.scss',
})
export class ScholarshipSearchDialogComponent implements OnInit {
  requirements: string[] = ['Yes', 'No', 'Either'];

  min: number = 0;
  max: number = 0;

  minChoice: number = 0;
  maxChoice: number = 0;

  searchForm: FormGroup = new FormGroup({
    meritBased: new FormControl('Either'),
    needBased: new FormControl('Either'),
    essayRequired: new FormControl('Either'),
    minAmount: new FormControl(this.minChoice),
    maxAmount: new FormControl(this.maxChoice),
  });

  constructor(
    private dialogRef: DialogRef,
    private scholarshipService: ScholarshipService,
    @Inject(DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {
    this.min = this.data.min;
    this.max = this.data.max;
    this.minChoice = this.data.minChoice;
    this.maxChoice = this.data.maxChoice;

    if (this.minChoice < this.min) {
      this.minChoice = this.min;
    }
    if (this.maxChoice > this.max || this.maxChoice < this.min) {
      this.maxChoice = this.max;
    }

    this.searchForm.patchValue({
      meritBased: this.data.meritBased,
      needBased: this.data.needBased,
      essayRequired: this.data.essayRequired,
      minAmount: this.minChoice,
      maxAmount: this.maxChoice,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  displayFn(value: number): string {
    if (value >= 1000) {
      return `$${Math.round(value / 1000)}k`;
    } else {
      return `$${Math.round(value)}`;
    }
  }
}
