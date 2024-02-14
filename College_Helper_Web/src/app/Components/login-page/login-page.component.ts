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
import { ApiCallService } from 'src/app/Services/api-call.service';

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
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  matcher = new ErrorStateMatcher();

  horizontalPos: MatSnackBarHorizontalPosition = 'center';
  verticalPos: MatSnackBarVerticalPosition = 'top';

  constructor(
    private router: Router,
    private apiCallService: ApiCallService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.apiCallService.checkIfUserIsLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  submit() {
    let loggedIn = this.apiCallService.login(
      this.form.get('username')?.value,
      this.form.get('password')?.value
    );

    if (loggedIn) {
      this.router.navigate(['/home']);
    } else {
      // display error message
      this.snackBar.open('Incorrect Password or Username', 'Close', {
        duration: 5000,
        horizontalPosition: this.horizontalPos,
        verticalPosition: this.verticalPos,
        politeness: 'assertive',
      });

      this.form.reset();
    }
  }

  emptyEmail() {
    return this.form.get('username')?.hasError('required');
  }

  invalidEmail() {
    return (
      this.form.get('username')?.hasError('email') &&
      !this.form.get('username')?.hasError('required')
    );
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
