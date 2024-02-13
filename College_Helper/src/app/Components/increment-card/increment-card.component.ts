import { Component } from '@angular/core';
import { ApiCallService } from 'src/app/Services/api-call.service';
import { PeopleService } from './age.service';

@Component({
  selector: 'app-increment-card',
  templateUrl: './increment-card.component.html',
  styleUrls: ['./increment-card.component.scss'],
})
export class IncrementCardComponent {
  jsonData: string = '';
  parsedPeople: any[] = [];

  constructor(private peopleService: PeopleService) {}

  parseJson(): void {
    try {
      this.parsedPeople = JSON.parse(this.jsonData);
      this.peopleService.incrementAges(this.parsedPeople);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }
  
}
