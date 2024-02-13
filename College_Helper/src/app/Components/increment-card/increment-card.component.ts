import { Component } from '@angular/core';
import { ApiCallService } from 'src/app/Services/api-call.service';
import { PeopleService } from './age.service';

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

  constructor(private peopleService: PeopleService) {}

  parseJson(): void {
    try {
      this.parsedPeople = JSON.parse(this.jsonData);
      this.peopleService.incrementAges(this.parsedPeople);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }
  addAge() {
    this.apiCallService.getAge(this.name, this.age).subscribe((data: any) => {
      this.response = data;
      this.addedAge = true;
    });
  }
}
