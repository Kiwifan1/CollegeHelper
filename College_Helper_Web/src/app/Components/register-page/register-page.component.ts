import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { ErrorStateMatcher } from '../login-page/login-page.component';
import { passwordMatchValidator } from '../common/validators';
import { User, defaultUser } from 'src/app/Objects/User/User';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  userForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  passwordForm = new FormGroup(
    {
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl(''),
    },
    {
      validators: [passwordMatchValidator('password', 'confirmPassword')],
    }
  );

  registered: boolean = false;
  token: string = '';

  user: User = defaultUser;

  matcher = new ErrorStateMatcher();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  emptyEmail() {
    return this.userForm.get('email')?.hasError('required');
  }

  invalidEmail() {
    return (
      this.userForm.get('email')?.hasError('email') &&
      !this.userForm.get('email')?.hasError('required')
    );
  }

  invalidPassword() {
    return (
      this.passwordForm.get('password')?.hasError('required') &&
      this.passwordForm.get('password')?.touched
    );
  }

  tooSmallPassword() {
    return (
      this.passwordForm.get('password')?.hasError('minlength') &&
      !this.passwordForm.get('password')?.hasError('required')
    );
  }

  invalidConfirmPassword() {
    let invalidConfirm =
      this.passwordForm.get('password')?.value !==
      this.passwordForm.get('confirmPassword')?.value;
    return invalidConfirm;
  }

  emptyUsername() {
    return this.userForm.get('username')?.hasError('required');
  }

  goBack() {
    this.router.navigate(['/login']);
  }

  register() {
    localStorage.setItem('user', JSON.stringify(this.user));
    localStorage.setItem('registerComplete', 'true');
    this.router.navigate(['/questionnaire']);
  }

  createAccount() {
    this.authService
      .checkIfUserExists(
        this.userForm.get('email')?.value,
        this.userForm.get('username')?.value
      )
      .pipe(
        switchMap((res: any) => {
          if (res.userExists) {
            return new Observable((observer) => {
              observer.error('User already exists');
            });
          } else {
            this.user.username = this.userForm.get('username')?.value ?? '';
            this.user.email = this.userForm.get('email')?.value ?? '';
            this.user.password = this.passwordForm.get('password')?.value ?? '';
            return this.authService.createUser(this.user);
          }
        })
      )
      .subscribe({
        next: (res: any) => {
          if (res !== null && res !== undefined) {
            this.user.id = res.id;
            this.register();
          } else {
            console.log('User creation failed');
          }
        },
        error: (err: any) => {
          console.error(err);
        },
      });
  }
}
