import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from '../_models/user/userProfile';
import { Observable } from 'rxjs';
import { RoleParam } from '../_models/role/role';
import { Buffer } from 'buffer'
@Injectable({
  providedIn: 'root'
})
export class UserMasterService {
  baseUrl: string = environment.apiUrl + 'UserMaster/'
  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(this.baseUrl);
  }

  getUser(id: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.baseUrl + id)
  }

  deleteUser(id: string) {
    return this.http.delete(this.baseUrl + id);
  }

  activateUser(user: any) {
    return this.http.post(this.baseUrl + 'ActivateUser', user);
  }

  getRoles(): Observable<RoleParam[]> {
    return this.http.get<RoleParam[]>(this.baseUrl + 'Roles');
  }

  getRole() {
    var token = localStorage.getItem('token');
    if (token != null) {
      var extractdata = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      return extractdata.role;
    } else {
      return '';
    }

  }

}
