import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  constructor(private $http: HttpClient) {}

  incrementNumber(parsedPeople: Text) {
    const url = 'https://ns7x1im6pb.execute-api.us-east-1.amazonaws.com/api/json/' + parsedPeople;
    return this.$http.get(url);
  }

  getAge(name: string, age: Number) {
    const content = {
      name: name,
      age: age,
    }
    let url = environment.API_URL + '/getAge';
    return this.$http.post(url, content);
  }

  checkIfUserIsLoggedIn() {
    const user = localStorage.getItem('user');
    return this.login(user ? user : '', 'admin');
  }

  login(username: string, password: string): boolean {
    if (username === 'admin@admin.com' && password === 'admin') {
      localStorage.setItem('user', username);
      return true;
    }
    return false;
  }
}
