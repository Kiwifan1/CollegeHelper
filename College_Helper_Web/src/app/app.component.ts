import { Component, OnInit } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { defaultUser } from './Objects/User/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'College_Helper';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.setTheme();
  }

  isAuthenticated() {
    return this.authService.checkIfUserIsLoggedIn();
  }

  setTheme() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  }
}
