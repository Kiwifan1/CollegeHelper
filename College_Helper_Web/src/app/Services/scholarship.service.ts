import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from './loading.service';
import { Scholarship } from '../Objects/Scholarship/Scholarship';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScholarshipService {
  constructor(private $http: HttpClient) {}

  getScholarships(
    offset: number,
    limit: number,
    filters: any = {},
    sort_by_match: boolean = false
  ): Observable<Scholarship[]> {
    let url = environment.WEB_API_URL + '/get_scholarships';
    const params = {
      offset: offset,
      limit: limit,
      sort_by_match: sort_by_match,
      ...filters,
    };
    return this.$http.get<Scholarship[]>(url, { params: params });
  }

  getScholarship(id: string): Observable<Scholarship> {
    let url = environment.WEB_API_URL + '/get_scholarship';

    return this.$http.get<Scholarship>(url, { params: { id: id } });
  }

  getNumScholarships(filters: any = {}): Observable<Number> {
    let url = environment.WEB_API_URL + '/get_num_scholarships';
    return this.$http.get<Number>(url, { params: filters });
  }
}
