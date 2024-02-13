import { Component } from '@angular/core';
import { ApiCallService } from 'src/app/Services/api-call.service';

@Component({
  selector: 'app-increment-card',
  templateUrl: './increment-card.component.html',
  styleUrls: ['./increment-card.component.scss'],
})
export class IncrementCardComponent {
  number = 0;

  constructor(private apiCallService: ApiCallService) {}

  increment() {
    console.log('clicked!');
    this.apiCallService.incrementNumber(this.number).subscribe((data: any) => {
      this.number = data['result'];
    });
  }
}
