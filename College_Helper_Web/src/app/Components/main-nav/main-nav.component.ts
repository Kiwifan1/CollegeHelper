import { Component, Input } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.scss',
})
export class MainNavComponent {
  @Input() sidenav: any;

  constructor(private router: Router) {}

  isAuthenticated() {
    return localStorage.getItem('user') !== null;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    this.sidenav.close();
  }
}
