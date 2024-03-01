import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-password-dialog',
  templateUrl: './confirm-password-dialog.component.html',
  styleUrl: './confirm-password-dialog.component.scss',
})
export class ConfirmPasswordDialogComponent {
  password: string | null = null;
  constructor() {}

}
