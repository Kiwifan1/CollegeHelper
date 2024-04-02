import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { College } from 'src/app/Objects/College/College';

@Component({
  selector: 'app-college-info',
  templateUrl: './college-info.component.html',
  styleUrl: './college-info.component.scss',
})
export class CollegeInfoComponent implements OnInit {
  @Input() collegeForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
