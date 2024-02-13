import { Injectable } from '@angular/core';
import { ApiCallService } from 'src/app/Services/api-call.service';

@Injectable({
  providedIn: 'root'
})

export class PeopleService {
    
    constructor(private apiCallService: ApiCallService) {}

  incrementAges(people: any[]): void {
    people.forEach(person => {
      person.age++;
    });
  }
}