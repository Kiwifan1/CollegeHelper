import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { College } from 'src/app/Objects/College/College';
import { Scholarship } from 'src/app/Objects/Scholarship/Scholarship';
import { User } from 'src/app/Objects/User/User';
import { AuthService } from 'src/app/Services/auth.service';
import { CollegeService } from 'src/app/Services/college.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { ScholarshipService } from 'src/app/Services/scholarship.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  bestCollege!: College;
  bestScholarship!: Scholarship;

  user: User = this.userService.getUser();

  loading: boolean = false;

  constructor(
    private loadingService: LoadingService,
    private userService: AuthService,
    private scholarshipService: ScholarshipService,
    private collegeService: CollegeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.scholarshipService.getBestScholarship(this.user.id).subscribe({
      next: (scholarship) => {
        this.bestScholarship = scholarship;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
      },
    });

    this.collegeService.getBestCollege(this.user.id).subscribe({
      next: (college) => {
        this.bestCollege = college;
      },
      error: (error) => {
      },
    });
  }

  goToScholarship() {
    this.router.navigate(['/scholarship', this.bestScholarship?.id]);
  }
}
