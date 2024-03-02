import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { College } from '../Objects/College/College';

@Injectable({
  providedIn: 'root',
})
export class CollegeService {
  constructor(private $http: HttpClient) {}

  getColleges(params: any): Observable<College[]> {
    let url = environment.WEB_API_URL + '/get_colleges';
    return this.$http.get<College[]>(url, { params: params });
  }
}
