import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Highschool } from '../Objects/Highschool/Highschool';

@Injectable({
  providedIn: 'root',
})
export class HighschoolService {
  constructor(private $http: HttpClient) {}

  getHighschools(state: string): Observable<Highschool[]> {
    let url = environment.WEB_API_URL + '/get_highschools';
    const params = {
      state: state,
    };
    return this.$http.get<Highschool[]>(url, { params: params });
  }
}
