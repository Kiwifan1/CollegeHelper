import { Component, Input, OnInit } from '@angular/core';
import { College } from 'src/app/Objects/College/College';

@Component({
  selector: 'app-college-detail-general',
  templateUrl: './college-detail-general.component.html',
  styleUrl: './college-detail-general.component.scss'
})
export class CollegeDetailGeneralComponent implements OnInit {
  @Input() college!: College;

  constructor() {}

  ngOnInit(): void {
      
  }
}
