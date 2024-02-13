import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  constructor(private $http: HttpClient) {}

  incrementNumber(num: Number) {
    console.log(environment);
    let url = environment.API_URL + '/increment/' + num;

    console.log(url);

    return this.$http.get(url);
  }
}
