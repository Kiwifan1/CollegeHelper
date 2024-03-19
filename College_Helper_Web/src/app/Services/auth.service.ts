import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../Objects/User/User';
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

  setUser(user: User) {
    const userJson = JSON.stringify(user);
    localStorage.setItem('user', userJson);
  }

  getUser() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      return JSON.parse(userJson) as User;
    } else {
      return {} as User;
    }
  }

  getUserFromServer() {
    const url = environment.WEB_API_URL + '/get_user';
    const user = this.getUser() as User;
    return this.$http.post(url, {
      username: user.username,
      password: user.password,
      salt: user.salt,
    });
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
    localStorage.removeItem('scholarships');
    if (localStorage.getItem('user')) {
      return false;
    }
    return true;
  }

  login(username: string, password: string) {
    const payload = {
      username: username,
      password: password,
    };
    const url = environment.WEB_API_URL + '/login';
    return this.$http.post(url, payload);
  }

  checkIfUserExists(email: string, username: string) {
    const url = environment.WEB_API_URL + '/check_user_exists';
    return this.$http.post(url, { email: email, username: username });
  }

  createUser(user: User) {
    const userJson = JSON.stringify(user);
    const url = environment.WEB_API_URL + '/create_user';
    return this.$http.post(url, userJson);
  }

  updateUser(user: User) {
    const userJson = JSON.stringify(user);
    const url = environment.WEB_API_URL + '/update_user';
    return this.$http.put(url, userJson);
  }
}
