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
  constructor(
    private $http: HttpClient,
    private loadingService: LoadingService
  ) {}

  getScholarships(offset: number, limit: number): Observable<Scholarship[]> {
    let url = environment.WEB_API_URL + '/get_scholarships';

    this.loadingService.updateLoadingStatus(true);
    return this.$http.get<Scholarship[]>(url, {
      params: { offset: offset, limit: limit },
    });
  }

  getScholarship(id: string): Observable<Scholarship> {
    let url = environment.WEB_API_URL + '/get_scholarship';

    this.loadingService.updateLoadingStatus(true);
    return this.$http.get<Scholarship>(url, { params: { id: id } });
  }

  getNumScholarships() {
    let url = environment.WEB_API_URL + '/get_num_scholarships';
    this.loadingService.updateLoadingStatus(true);
    return this.$http.get<Number>(url);
  }
}
