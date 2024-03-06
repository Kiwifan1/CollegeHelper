import { Component, Input, OnInit } from '@angular/core';
import { Scholarship } from 'src/app/Objects/Scholarship/Scholarship';

@Component({
  selector: 'app-scholarship-item',
  templateUrl: './scholarship-item.component.html',
  styleUrl: './scholarship-item.component.scss',
})
export class ScholarshipItemComponent implements OnInit {
  @Input() scholarship!: Scholarship; 

  constructor() {}

  ngOnInit(): void {}
}
