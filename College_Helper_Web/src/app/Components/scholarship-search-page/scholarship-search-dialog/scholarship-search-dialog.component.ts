import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-scholarship-search-dialog',
  templateUrl: './scholarship-search-dialog.component.html',
  styleUrl: './scholarship-search-dialog.component.scss',
})
export class ScholarshipSearchDialogComponent {
  requirements = Object.values(ScholarshipRequirements).filter(
    (value) => typeof value === 'string'
  ) as string[];

  searchForm: FormGroup = new FormGroup({
    meritBased: new FormControl(ScholarshipRequirements.Either),
    needBased: new FormControl(ScholarshipRequirements.Either),
    essayRequired: new FormControl(ScholarshipRequirements.Either),
    minAmount: new FormControl(0),
    maxAmount: new FormControl(0),
  });
}

enum ScholarshipRequirements {
  Yes,
  No,
  Either,
}
