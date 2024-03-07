import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ScholarshipService } from '../Services/scholarship.service';

export const scholarshipResolver: ResolveFn<any> = (route, state) => {
  // get the id from the route
  const id = route.paramMap.get('id');
  const scholarshipService = inject(ScholarshipService);
  return scholarshipService.getScholarship(id ?? '');
};
