import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scholarship-item',
  templateUrl: './scholarship-item.component.html',
  styleUrl: './scholarship-item.component.scss',
})
export class ScholarshipItemComponent implements OnInit {
  @Input() scholarship: any;

  constructor() {}

  ngOnInit(): void {}
}
