import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ScholarshipService {
  constructor(private $http: HttpClient) {}

  getScholarships() {
    let url = environment.WEB_API_URL + '/get_scholarships';
    return this.$http.get(url);
  }

  getScholarship(id: string) {
    let url = environment.WEB_API_URL + '/get_scholarship';
    return this.$http.get(url, { params: { id: id } });
  }
}
