import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.scss',
})
export class MainNavComponent {
  @Input() sidenav: any;
  
  isAuthenticated() {
    return localStorage.getItem('user') !== null;
  }
}
