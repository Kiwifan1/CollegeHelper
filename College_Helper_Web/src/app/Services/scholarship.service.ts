import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from './loading.service';
import { Scholarship } from '../Objects/Scholarship/Scholarship';
import { Observable } from 'rxjs';
import { User } from '../Objects/User/User';

@Injectable({
  providedIn: 'root',
})
export class ScholarshipService {
  constructor(private $http: HttpClient) {}

  getScholarships(
    offset: number,
    limit: number,
    filters: any = {}
  ): Observable<Scholarship[]> {
    let url = environment.WEB_API_URL + '/get_scholarships';
    const params = {
      offset: offset,
      limit: limit,
      ...filters,
    };

    if (params.minAmount > params.maxAmount || params.maxAmount === 0) {
      delete params.minAmount;
      delete params.maxAmount;
    }
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

  predictScholarships(user: User): Observable<any> {
    let user_json = JSON.stringify(user);
    let url = environment.WEB_API_URL + '/predict_scholarships';
    return this.$http.post(url, user_json);
  }

  getScholarshipAwardAmounts(filters: any = {}): Observable<any> {
    // get rid of minAmount and maxAmount if present only for the purpose of this call
    let params = {
      ...filters,
    };

    delete params.minAmount;
    delete params.maxAmount;
    let url = environment.WEB_API_URL + '/get_scholarship_award_amounts';
    let res = this.$http.get(url, { params: params });

    return res;
  }

  getBestScholarship(user_id: string): Observable<Scholarship> {
    let url = environment.WEB_API_URL + '/get_best_scholarship';
    return this.$http.get<Scholarship>(url, { params: { id: user_id } });
  }
}
