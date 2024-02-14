import { Component, OnInit } from '@angular/core';
import { ApiCallService } from './Services/api-call.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'College_Helper';

  constructor() {}

  ngOnInit() {
    this.setTheme();
  }

  setTheme() {
    const theme = localStorage.getItem('theme');
    const themeClass = 'dark-mode';
    const overlayContainer = document.querySelector(
      '.cdk-overlay-container'
    ) as HTMLElement;
    const body = document.querySelector('body') as HTMLElement;

    if (theme === 'dark' && overlayContainer) {
      overlayContainer.classList.add(themeClass);
      body.classList.add(themeClass);
      localStorage.setItem('theme', 'dark');
    }
  }
}
