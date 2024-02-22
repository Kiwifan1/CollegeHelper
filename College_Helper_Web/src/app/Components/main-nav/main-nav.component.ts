import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.scss',
})
export class MainNavComponent {
  @Input() sidenav: any;

  // TODO: replace with actual username grabbed from database when logging in
  user = localStorage.getItem('user');

  constructor(private router: Router, private dialog: MatDialog) {}

  isAuthenticated() {
    return localStorage.getItem('user') !== null;
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
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    this.sidenav.close();
  }
}
