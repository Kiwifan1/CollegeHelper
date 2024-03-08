import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Observable, filter, of } from 'rxjs';
import { College } from 'src/app/Objects/College/College';
import { CollegeService } from 'src/app/Services/college.service';
import { LoadingService } from 'src/app/Services/loading.service';

@Component({
  selector: 'app-college-list',
  templateUrl: './college-list.component.html',
  styleUrl: './college-list.component.scss',
})
export class CollegeListComponent implements OnInit {
  @Output() collegeSelected = new EventEmitter<College>();

  colleges: College[] = [];

  filteredColleges = of(this.colleges);

  selectedCollege!: College;

  // for search bar
  searchForm: FormControl = new FormControl('');

  constructor(
    private collegeService: CollegeService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.collegeService.getColleges({}).subscribe((colleges) => {
      this.colleges = colleges;
      this.filteredColleges = of(this.colleges);
      this.loadingService.updateLoadingStatus(false);
    });

    this.searchForm.valueChanges.subscribe((value) => {
      this.filteredColleges = this.filterColleges(value);
    });
  }

  filterColleges(value: string) {
    let filteredColleges: College[] = [];
    this.colleges.forEach((college) => {
      if (college.name.toLowerCase().includes(value.toLowerCase())) {
        filteredColleges.push(college);
      }
    });
    return of(filteredColleges);
  }

  selectCollege(college: College) {
    this.selectedCollege = college;
    this.collegeSelected.emit(this.selectedCollege);
  }
}
