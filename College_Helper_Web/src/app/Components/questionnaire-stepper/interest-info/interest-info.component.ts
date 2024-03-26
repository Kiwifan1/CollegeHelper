import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import {
  InterestCriteriaEnum,
  InterestOtherEnum,
} from 'src/app/Objects/enums/Interests';

@Component({
  selector: 'app-interests-info',
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

  selectedInterestCriterias: string[] = [];
  selectedInterestOthers: string[] = [];

  filteredInterestCriterias = of(this.interestCriterias);
  filteredInterestOthers = of(this.interestOthers);

  criteriaSearchForm: FormControl = new FormControl('');
  otherSearchForm: FormControl = new FormControl('');

  constructor() {}

  ngOnInit(): void {
    this.criteriaSearchForm.valueChanges.subscribe((value) => {
      this.filterChange('criteria');
      this.updateInterestsForm();
    });

    this.otherSearchForm.valueChanges.subscribe((value) => {
      this.filterChange('other');
      this.updateInterestsForm();
    });
  }

  updateInterestsForm() {
    this.interestForm.value.criteriaInterests = this.selectedInterestCriterias;
    this.interestForm.value.otherInterests = this.selectedInterestOthers;
  }

  addCriteriaInterest(interestName: string) {
    if (this.selectedInterestCriterias.includes(interestName)) return;
    this.selectedInterestCriterias.push(interestName);
    this.criteriaSearchForm.setValue('');
  }

  removeCriteriaInterest(interestName: string) {
    this.selectedInterestCriterias = this.selectedInterestCriterias.filter(
      (value) => value !== interestName
    );
    this.criteriaSearchForm.setValue('');
  }

  addOtherInterest(interestName: string) {
    if (this.selectedInterestOthers.includes(interestName)) return;
    this.selectedInterestOthers.push(interestName);
    this.otherSearchForm.setValue('');
  }

  removeOtherInterest(interestName: string) {
    this.selectedInterestOthers = this.selectedInterestOthers.filter(
      (value) => value !== interestName
    );
    this.otherSearchForm.setValue('');
  }

  filterChange(type: 'criteria' | 'other') {
    if (type === 'criteria') {
      this.filteredInterestCriterias = this.filterInterests(
        this.criteriaSearchForm.value,
        type
      );
    } else {
      this.filteredInterestOthers = this.filterInterests(
        this.otherSearchForm.value,
        type
      );
    }
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
