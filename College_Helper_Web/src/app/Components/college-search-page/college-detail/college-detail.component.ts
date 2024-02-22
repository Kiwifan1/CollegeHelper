import { Component, Input, OnInit } from '@angular/core';
import { College } from 'src/app/Objects/College/College';

@Component({
  selector: 'app-college-detail',
  templateUrl: './college-detail.component.html',
  styleUrl: './college-detail.component.scss',
})
export class CollegeDetailComponent implements OnInit {
  @Input() college!: College;

  constructor() {}

  ngOnInit(): void {}
}
