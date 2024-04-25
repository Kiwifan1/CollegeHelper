import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-scholarship-search-dialog',
  templateUrl: './scholarship-search-dialog.component.html',
  styleUrl: './scholarship-search-dialog.component.scss',
})
export class ScholarshipSearchDialogComponent {
  requirements: string[] = ['Yes', 'No', 'Either'];

  min: number = 0;
  max: number = 100000;

  minChoice: number = 0;
  maxChoice: number = 100000;

  searchForm: FormGroup = new FormGroup({
    meritBased: new FormControl('Either'),
    needBased: new FormControl('Either'),
    essayRequired: new FormControl('Either'),
    minAmount: new FormControl(this.minChoice),
    maxAmount: new FormControl(this.maxChoice),
  });

  constructor(private dialogRef: DialogRef) {}

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
