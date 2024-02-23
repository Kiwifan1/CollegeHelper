import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-score-info',
  templateUrl: './score-info.component.html',
  styleUrl: './score-info.component.scss',
})
export class ScoreInfoComponent implements OnInit {
  @Input() userScoreInfoForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
