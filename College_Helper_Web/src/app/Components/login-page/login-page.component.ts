import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from 'src/app/Services/auth.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { EndpointErrorSnackbarComponent } from '../common/endpoint-error-snackbar/endpoint-error-snackbar.component';

// standin class for error matching
export class ErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  matcher = new ErrorStateMatcher();

  horizontalPos: MatSnackBarHorizontalPosition = 'center';
  verticalPos: MatSnackBarVerticalPosition = 'top';

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    if (this.authService.checkIfUserIsLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  submit() {
    this.loadingService.updateLoadingStatus(true);
    this.authService
      .login(this.form.get('username')?.value, this.form.get('password')?.value)
      .subscribe({
        next: (res: any) => {
          this.authService.setUser(res);
          this.router.navigate(['/home']);
        },
        error: (err: any) => {
          this.snackBar.openFromComponent(EndpointErrorSnackbarComponent, {
            duration: 5000,
            data: err.error,
          });
        },
        complete: () => {
          this.form.reset();
          this.loadingService.updateLoadingStatus(false);
        },
      });
  }

  emptyUsername() {
    return this.form.get('username')?.hasError('required');
  }

  invalidPassword() {
    return (
      this.form.get('password')?.hasError('required') &&
      this.form.get('password')?.touched
    );
  }

  register() {
    this.router.navigate(['/register']);
  }
}
