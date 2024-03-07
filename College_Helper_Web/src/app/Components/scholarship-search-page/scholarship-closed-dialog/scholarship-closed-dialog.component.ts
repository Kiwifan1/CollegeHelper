import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scholarship-closed-dialog',
  templateUrl: './scholarship-closed-dialog.component.html',
  styleUrl: './scholarship-closed-dialog.component.scss',
})
export class ScholarshipClosedDialogComponent {
  id: string = this.data.id;
  openDate: string = this.data.openDate;
  closeDate: string = this.data.closeDate;
  constructor(
    private route: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  routeToDetails() {
    this.route.navigate(['scholarship', this.id]);
  }
}
