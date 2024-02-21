import { Component, Input } from '@angular/core';
import { College } from 'src/app/Objects/College/College';

@Component({
  selector: 'app-college-detail-admissions',
  templateUrl: './college-detail-admissions.component.html',
  styleUrl: '../college-detail.component.scss',
})
export class CollegeDetailAdmissionsComponent {
  @Input() college!: College;
}
