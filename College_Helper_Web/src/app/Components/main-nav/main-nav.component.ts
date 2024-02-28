import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { AuthService } from 'src/app/Services/auth.service';
import { User } from 'src/app/Objects/User/User';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.scss',
})
export class MainNavComponent implements OnInit {
  @Input() sidenav: any;

  // TODO: replace with actual username grabbed from database when logging in
  user: User | null = null;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.user = this.authService.getUser();
  }

  ngOnInit(): void {}

  isAuthenticated() {
    return this.authService.checkIfUserIsLoggedIn();
  }

  goToProfile() {
    this.router.navigate(['/profile']);
    this.sidenav.close();
  }

  openSettings() {
    const dialogRef = this.dialog.open(SettingsDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
