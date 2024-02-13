import { Component } from '@angular/core';
import { ApiCallService } from 'src/app/Services/api-call.service';

@Component({
  selector: 'app-increment-card',
  templateUrl: './increment-card.component.html',
  styleUrls: ['./increment-card.component.scss'],
})
export class IncrementCardComponent {
  number: Number = 0;
  name: string = '';
  age: Number = 0;
  addedAge: boolean = false;
  response: any;

  constructor(private apiCallService: ApiCallService) {}

  increment() {
    this.apiCallService.incrementNumber(this.number).subscribe((data: any) => {
      this.number = data['result'];
    });
  }

  addAge() {
    this.apiCallService.getAge(this.name, this.age).subscribe((data: any) => {
      this.response = data;
      this.addedAge = true;
    });
  }
}
