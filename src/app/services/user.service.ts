import { User } from './../user/entity/user';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly BASE_URL_AUTH = `http://localhost:8080/rest/auth/signup`;
  readonly BASE_URL_USERS = `http://localhost:8080/rest/users`;

  // readonly BASE_URL_AUTH = `http://localhost:8080/auth/signup`;
  // readonly BASE_URL_USERS = `http://localhost:8080/users`;

  constructor(private http: HttpClient) { }

  public register(user: User): Observable<HttpResponse<any>> {
    return this.http.post(this.BASE_URL_AUTH, user, {observe: 'response'});
  }

  public getUsers(): Observable<any> {
    return this.http.get<any>(this.BASE_URL_USERS);
  }

  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL_USERS}/${id}`);
  }
}
