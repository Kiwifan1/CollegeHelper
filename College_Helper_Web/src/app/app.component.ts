import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { LoadingService } from './Services/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'College_Helper';

  isLoading: boolean = false;
  loadingSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.loadingSubscription = this.loadingService.isLoading.subscribe(
      (status) => {
        this.isLoading = status;
      }
    );
    this.setTheme();
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
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
