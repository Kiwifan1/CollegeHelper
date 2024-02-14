import { Component } from '@angular/core';
import { ApiCallService } from 'src/app/Services/api-call.service';

@Component({
  selector: 'app-increment-card',
  templateUrl: './increment-card.component.html',
  styleUrls: ['./increment-card.component.scss'],
})
export class IncrementCardComponent {
  number: number = 0;
  name: string = '';
  age: number = 0;
  agePressed: boolean = false;
  result: any;

  constructor(private apiCallService: ApiCallService) {}

  increment() {
    console.log('clicked!');
    this.apiCallService.incrementNumber(this.number).subscribe((data: any) => {
      this.number = data['result'];
    });
  }

  getAge() {
    this.apiCallService.getAge(this.name, this.age).subscribe((data: any) => {
      this.agePressed = true;
      this.result = data;
    });
  }
}
