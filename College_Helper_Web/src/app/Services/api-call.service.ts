import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  constructor(private $http: HttpClient) {}

  incrementNumber(num: Number) {
    let url = environment.WEB_API_URL + '/increment/' + num;
    return this.$http.get(url);
  }

  getAge(name: string, age: Number) {
    const content = {
      name: name,
      age: age,
    };
    let url = environment.WEB_API_URL + '/getAge';
    return this.$http.post(url, content);
  }

  getUser() {
    return localStorage.getItem('user');
  }

  checkIfUserIsLoggedIn() {
    const user = localStorage.getItem('user');
    if (user) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('user');

    if (localStorage.getItem('user')) {
      return false;
    }
    return true;
  }

  login(username: string, password: string): boolean {
    if (username === 'admin@admin.com' && password === 'admin') {
      localStorage.setItem('user', username);
      return true;
    }
    return false;
  }
}
