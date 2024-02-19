import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { College } from 'src/app/Objects/College/College';

@Component({
  selector: 'app-college-item',
  templateUrl: './college-item.component.html',
  styleUrl: './college-item.component.scss',
})
export class CollegeItemComponent implements OnInit {
  @Input() college: College = {} as College;
  @Output() chosenCollege = new EventEmitter<College>();

  constructor() {}

  ngOnInit(): void {}

  getCollegeName(): string {
    return this.college.name;
  }

  displayCollegeInfo() {
    this.chosenCollege.emit(this.college);
  }
}
