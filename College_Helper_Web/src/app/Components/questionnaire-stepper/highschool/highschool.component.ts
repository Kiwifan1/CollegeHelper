import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Highschool } from 'src/app/Objects/Highschool/Highschool';
import { USStatesEnum } from 'src/app/Objects/USStates';
import { HighschoolService } from 'src/app/Services/highschool.service';
import { LoadingService } from 'src/app/Services/loading.service';

@Component({
  selector: 'app-highschool',
  templateUrl: './highschool.component.html',
  styleUrl: './highschool.component.scss',
})
export class HighschoolComponent implements OnInit {
  @Input() highschoolForm!: FormGroup;
  @Input() state: string = '';

  stateEnums = Object.values(USStatesEnum).filter(
    (value) => typeof value === 'string'
  );

  highschools!: Highschool[];

  filteredStates: Observable<string[]> = of(this.stateEnums);
  filteredHighschools: Observable<Highschool[]> = of(this.highschools);

  highschoolSearchForm = new FormControl('');
  stateSearchForm = new FormControl('');

  constructor(
    private highschoolService: HighschoolService,
    private loadingService: LoadingService
  ) {}
  ngOnInit(): void {
    this.highschoolSearchForm.valueChanges.subscribe((value) => {
      this.filterHighschools(value as string);
    });

    this.stateSearchForm.valueChanges.subscribe((value) => {
      this.filterStates(value as string);
    });
  }

  reset() {
    this.highschools = [];
    this.filterHighschools('');
    this.highschoolForm.patchValue({
      highschool: null,
    });
    this.highschoolSearchForm.setValue('');
  }

  getHighschools(state: string) {
    this.state = state;
    this.reset();
    this.loadingService.updateLoadingStatus(true);
    this.highschoolService.getHighschools(state).subscribe({
      next: (highschools) => {
        this.highschools = highschools;
        this.filterHighschools('');
        this.loadingService.updateLoadingStatus(false);
      },
      error: (error) => {
        console.error(error);
        this.highschools = [];
        this.filterHighschools('');
        this.loadingService.updateLoadingStatus(false);
      },
    });
  }

  filterHighschools(name: string) {
    // Filter the highschools based on the name or code
    this.filteredHighschools = of(
      this.highschools.filter(
        (highschool) =>
          highschool.name.toLowerCase().includes(name.toLowerCase()) ||
          highschool.code.toLowerCase().includes(name.toLowerCase())
      )
    );
  }

  filterStates(name: string) {
    this.filteredStates = of(
      this.stateEnums.filter((state) =>
        state.toLowerCase().includes(name.toLowerCase())
      )
    );
  }

  setState(state: string) {
    this.state = state;
    this.getHighschools(state);
  }

  setHighschool(highschool: Highschool) {
    this.highschoolForm.patchValue({
      highschool: highschool,
    });
  }
}
