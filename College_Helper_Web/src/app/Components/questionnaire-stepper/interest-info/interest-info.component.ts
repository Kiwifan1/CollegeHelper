import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import {
  InterestCriteriaEnum,
  InterestOtherEnum,
} from 'src/app/Objects/enums/Interests';

@Component({
  selector: 'app-career-info',
  templateUrl: './interest-info.component.html',
  styleUrl: './interest-info.component.scss',
})
export class InterestInfoComponent implements OnInit {
  @Input() interestForm!: FormGroup;

  interestCriterias: string[] = Object.values(InterestCriteriaEnum)
    .filter((value) => typeof value === 'string')
    .map((value) => value.toString());

  interestOthers: string[] = Object.values(InterestOtherEnum)
    .filter((value) => typeof value === 'string')
    .map((value) => value.toString());

  filteredInterestCriterias = of(this.interestCriterias);
  filteredInterestOthers = of(this.interestOthers);

  criteriaSearchForm: FormControl = new FormControl('');
  otherSearchForm: FormControl = new FormControl('');

  constructor() {}

  ngOnInit(): void {
    this.criteriaSearchForm.valueChanges.subscribe((value) => {
      this.criteriaFilterChange('criteria');
    });

    this.otherSearchForm.valueChanges.subscribe((value) => {
      this.criteriaFilterChange('other');
    });
  }

  addInterest(careerName: string) {
    // add career to form which is list of careers
    this.interestForm.patchValue({
      careers: [...this.interestForm.value.careers, careerName],
    });
  }

  criteriaFilterChange(type: 'criteria' | 'other') {
    this.filteredInterestCriterias = this.filterInterests(
      this.criteriaSearchForm.value,
      type
    );
  }

  filterInterests(value: string, type: 'criteria' | 'other') {
    const interestType =
      type === 'criteria' ? this.interestCriterias : this.interestOthers;

    const filteredInterests = interestType.filter((interest) =>
      interest.toLowerCase().includes(value.toLowerCase())
    );
    return of(filteredInterests);
  }
}
