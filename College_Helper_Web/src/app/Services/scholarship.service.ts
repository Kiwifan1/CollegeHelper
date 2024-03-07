import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ScholarshipService {
  constructor(private $http: HttpClient) {}

  getScholarships(offset: number, limit: number) {
    let url = environment.WEB_API_URL + '/get_scholarships';
    return this.$http.get(url, { params: { offset: offset, limit: limit } });
  }

  getScholarship(id: string) {
    let url = environment.WEB_API_URL + '/get_scholarship';
    return this.$http.get(url, { params: { id: id } });
  }

  getNumScholarships() {
    let url = environment.WEB_API_URL + '/get_num_scholarships';
    return this.$http.get(url);
  }
}
