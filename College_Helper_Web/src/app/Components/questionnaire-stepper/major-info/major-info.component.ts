import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, of, startWith } from 'rxjs';
import { FieldsOfStudyEnum } from 'src/app/Objects/enums/FieldsOfStudy';

@Component({
  selector: 'app-major-info',
  templateUrl: './major-info.component.html',
  styleUrl: './major-info.component.scss',
})
export class MajorInfoComponent implements OnInit {
  @Input() majorsForm!: FormGroup;

  majors: string[] = Object.values(FieldsOfStudyEnum)
    .filter((value) => typeof value === 'string')
    .map((value) => value.toString());

  filteredMajors = of(this.majors);
  selectedMajors: string[] = [];
  searchForm: FormControl = new FormControl(['']);

  constructor() {}

  ngOnInit(): void {
    this.searchForm.valueChanges.subscribe((value: string[] | string) => {
      if (value && typeof value !== 'string') {
        this.filteredMajors = of(this.majors);
      } else if (typeof value === 'string') {
        this.filterMajors(value);
      }
      this.updateMajorsForm();
    });
  }

  updateMajorsForm() {
    this.majorsForm.value.fieldsOfStudy = this.selectedMajors;
  }

  addMajor(major: string) {
    if (this.selectedMajors.includes(major)) return;
    this.selectedMajors.push(major);
    this.searchForm.setValue(null);
    this.filterMajors('');
  }

  removeMajor(major: string) {
    this.selectedMajors = this.selectedMajors.filter(
      (value) => value !== major
    );
  }

  filterMajors(value: string) {
    // get last word in search form
    this.filteredMajors = of(
      this.majors.filter((major) =>
        major.toLowerCase().includes(value.toLowerCase())
      )
    );
  }
}
