import { CanActivateFn, Router } from '@angular/router';
import { loginGuard } from './login.guard';
import { inject } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AuthService } from '../Services/auth.service';

export const notLoggedInGuard: CanActivateFn = (route, state) => {
  const loginService = inject(AuthService);
  const snackBar = inject(MatSnackBar);
  const router = inject(Router);

  const isLoggedIn = loginService.checkIfUserIsLoggedIn();

  let horizontalPos: MatSnackBarHorizontalPosition = 'center';
  let verticalPos: MatSnackBarVerticalPosition = 'top';

  if (isLoggedIn) {
    router.navigate(['/home']);
    snackBar.open('Access Denied', 'Close', {
      duration: 5000,
      horizontalPosition: horizontalPos,
      verticalPosition: verticalPos,
      politeness: 'assertive',
    });
  }

  return !isLoggedIn;
};
