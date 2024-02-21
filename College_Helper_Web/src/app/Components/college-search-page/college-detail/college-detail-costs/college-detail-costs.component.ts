import { Component, Input } from '@angular/core';
import { College } from 'src/app/Objects/College/College';

@Component({
  selector: 'app-college-detail-costs',
  templateUrl: './college-detail-costs.component.html',
  styleUrl: '../college-detail.component.scss',
})
export class CollegeDetailCostsComponent {

  @Input() college!: College;
}
