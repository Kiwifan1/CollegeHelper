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
  filteredHighschools: Observable<Highschool[]> = of(this.highschools);
  highschoolSearchForm = new FormControl(['']);

  constructor(
    private highschoolService: HighschoolService,
    private loadingService: LoadingService
  ) {}
  ngOnInit(): void {
    console.log(this.state);
  }

  getHighschools(state: string) {
    this.state = state;
    this.loadingService.updateLoadingStatus(true);
    this.highschoolService.getHighschools(state).subscribe({
      next: (highschools) => {
        this.highschools = highschools;
        console.log(highschools);
        this.loadingService.updateLoadingStatus(false);
      },
      error: (error) => {
        console.error(error);
        this.highschools = [];
        this.loadingService.updateLoadingStatus(false);
      },
    });
  }

  filterHighschools(name: string): Observable<Highschool[]> {
    // Filter the highschools based on the name or code
    return of(
      this.highschools.filter(
        (highschool) =>
          highschool.name.toLowerCase().includes(name.toLowerCase()) ||
          highschool.code.toLowerCase().includes(name.toLowerCase())
      )
    );
  }

  setHighschool(highschool: Highschool) {
    this.highschoolForm.patchValue({
      highschool: highschool,
    });
  }
}
