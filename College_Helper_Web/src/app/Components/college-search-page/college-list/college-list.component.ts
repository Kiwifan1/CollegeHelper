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
  initialLoad: number = 20;
  fullListDisplayed: boolean = false;

  colleges: College[] = [];
  limit: number = 20;
  offset: number = 0;

  filteredColleges = of(this.colleges);

  selectedCollege!: College;

  // for search bar
  searchForm: FormControl = new FormControl('');

  constructor(
    private collegeService: CollegeService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.updateLoadingStatus(true);
    this.collegeService
      .getColleges({ limit: this.limit, offset: this.offset })
      .subscribe((colleges) => {
        this.colleges = colleges;
        this.filteredColleges = of(this.colleges);
        this.loadingService.updateLoadingStatus(false);
      });

    this.searchForm.valueChanges.subscribe((value) => {
      this.filterColleges(value);
    });
  }

  onScroll() {
    this.offset += this.limit;
    if (this.initialLoad <= this.colleges.length) {
      this.collegeService
        .getColleges({ limit: this.limit, offset: this.offset })
        .subscribe((colleges) => {
          this.colleges = this.colleges.concat(colleges);
          this.filterColleges(this.searchForm.value);
          this.loadingService.updateLoadingStatus(false);
        });
    } else {
      this.fullListDisplayed = true;
    }
  }

  filterColleges(value: string) {
    let filteredColleges: College[] = [];
    this.colleges.forEach((college) => {
      if (college.name.toLowerCase().includes(value.toLowerCase())) {
        filteredColleges.push(college);
      }
    });
    this.filteredColleges = of(filteredColleges);
  }

  selectCollege(college: College) {
    this.selectedCollege = college;
    this.collegeSelected.emit(this.selectedCollege);
  }
}
