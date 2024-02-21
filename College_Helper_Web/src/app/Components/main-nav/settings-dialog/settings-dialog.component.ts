import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemeService } from 'src/app/Services/theme.service';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrl: './settings-dialog.component.scss',
})
export class SettingsDialogComponent implements OnInit {
  selectedTheme =
    localStorage.getItem('darkMode') === 'true' ? 'dark' : 'light';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {}

  switchTheme() {
    this.themeService.setDarkMode(this.selectedTheme !== 'light');
  }
}
