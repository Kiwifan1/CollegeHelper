import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  filter,
  of,
} from 'rxjs';
import { College } from 'src/app/Objects/College/College';
import { CollegeService } from 'src/app/Services/college.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { EndpointErrorSnackbarComponent } from '../../common/endpoint-error-snackbar/endpoint-error-snackbar.component';

@Component({
  selector: 'app-college-list',
  templateUrl: './college-list.component.html',
  styleUrl: './college-list.component.scss',
})
export class CollegeListComponent implements OnInit, AfterViewInit {
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
    private loadingService: LoadingService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadingService.updateLoadingStatus(true);
    this.collegeService
      .getColleges({ limit: this.limit, offset: this.offset })
      .subscribe({
        next: (colleges) => {
          this.colleges = colleges;
          this.filteredColleges = of(this.colleges);
          this.loadingService.updateLoadingStatus(false);
        },
        error: (error) => {
          this.loadingService.updateLoadingStatus(false);
          this.snackBar.openFromComponent(EndpointErrorSnackbarComponent, {
            duration: 5000,
            data: { error: error.error },
          });
        },
      });

    this.searchForm.valueChanges.subscribe((value) => {
      this.filterColleges(value);
    });
  }

  ngAfterViewInit(): void {
    this.searchForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          return;
        }
        this.loadingService.updateLoadingStatus(true);
        this.collegeService
          .getCollegesByNames({ name: this.searchForm.value })
          .subscribe({
            next: (colleges) => {
              // append colleges to the list if they are not already in the list
              colleges.forEach((college) => {
                if (!this.colleges.includes(college)) {
                  this.colleges.push(college);
                }
              });
              this.filterColleges(this.searchForm.value);
              this.loadingService.updateLoadingStatus(false);
            },
            error: (error) => {
              this.loadingService.updateLoadingStatus(false);
              this.snackBar.openFromComponent(EndpointErrorSnackbarComponent, {
                duration: 5000,
                data: { error: error.error },
              });
            },
          });
      });
  }

  onScroll() {
    this.offset += this.limit;
    if (this.initialLoad <= this.colleges.length) {
      this.collegeService
        .getColleges({ limit: this.limit, offset: this.offset })
        .subscribe({
          next: (colleges) => {
            this.colleges = this.colleges.concat(colleges);
            this.filterColleges(this.searchForm.value);
            this.loadingService.updateLoadingStatus(false);
          },
          error: (error) => {
            this.loadingService.updateLoadingStatus(false);
            this.snackBar.openFromComponent(EndpointErrorSnackbarComponent, {
              duration: 5000,
              data: { error: error.error },
            });
          },
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
