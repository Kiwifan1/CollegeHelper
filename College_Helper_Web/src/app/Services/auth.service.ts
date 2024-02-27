import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User, defaultUser } from '../Objects/User/User';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
    const user = defaultUser;
    // convert user to json
    const userJson = JSON.stringify(user);

    const url = environment.WEB_API_URL + '/login';
    this.$http.post(url, userJson).subscribe((res) => {
      console.log(res);
      localStorage.setItem('user', res.toString());
    });
    return true;
  }

  createUser(user: User) {
    // convert user to json but don't let it be a byte array
    const userJson = JSON.stringify(user);
    const url = environment.WEB_API_URL + '/create_user';
    this.$http.post(url, userJson).subscribe((res) => {
      console.log(res);
    });
  }
}
