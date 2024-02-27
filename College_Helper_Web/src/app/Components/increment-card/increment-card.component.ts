import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

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

  constructor(private apiCallService: AuthService) {}

  increment() {
    console.log('clicked!');
    this.apiCallService.incrementNumber(this.number).subscribe((data: any) => {
      this.number = data['value'];
    });
  }

  getAge() {
    this.apiCallService.getAge(this.name, this.age).subscribe((data: any) => {
      this.agePressed = true;
      this.result = data;
    });
  }
}
