import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scholarship-item',
  templateUrl: './scholarship-item.component.html',
  styleUrl: './scholarship-item.component.scss'
})
export class ScholarshipItemComponent {
  @Input() scholarship: any;

  constructor() {}

  
}
