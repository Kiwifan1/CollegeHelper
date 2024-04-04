import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-endpoint-error-snackbar',
  templateUrl: './endpoint-error-snackbar.component.html',
  styleUrl: './endpoint-error-snackbar.component.scss',
})
export class EndpointErrorSnackbarComponent implements OnInit {
  @Input() error!: string;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) private data: any,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.error = this.data.error;
  }

  close(): void {
    this.snackBar.dismiss();
  }
}
