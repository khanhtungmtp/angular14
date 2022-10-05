import { userParam } from './../_models/login/userLogin';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = environment.apiUrl
  baseUrl: string = this.apiUrl + 'User/'
  constructor(
    private http: HttpClient
  ) { }

  processLogin(userParam: userParam) {
    return this.http.post<userParam>(this.baseUrl + 'Authenticate', userParam);
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  getToken() {
    return localStorage.getItem('token') != null ? localStorage.getItem('token') : '';
  }

  register(userReigsterParam: any) {
    return this.http.post(this.baseUrl + 'Register', userReigsterParam);
  }
}
