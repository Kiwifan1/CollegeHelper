import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiCallService } from '../Services/api-call.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

export const loginGuard: CanActivateFn = (route, state) => {
  const apiService = inject(ApiCallService);
  const snackBar = inject(MatSnackBar);
  const router = inject(Router);

  let horizontalPos: MatSnackBarHorizontalPosition = 'center';
  let verticalPos: MatSnackBarVerticalPosition = 'top';

  let loggedIn = apiService.checkIfUserIsLoggedIn();

  if (!loggedIn) {
    router.navigate(['/login']);
    snackBar.open('Access Denied', 'Close', {
      duration: 5000,
      horizontalPosition: horizontalPos,
      verticalPosition: verticalPos,
      politeness: 'assertive',
    });
  }
  return loggedIn;
};
