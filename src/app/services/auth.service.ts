import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationRequest } from './entity/AuthenticationRequest';
import { AuthenticationResponse } from './entity/AuthenticationResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private uri = `http://localhost:8080/rest/auth/login`;

  constructor(private http: HttpClient) { }

  public login(user: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post(this.uri, user)
      .pipe(tap(this.saveUserAuth));
  }

  public saveUserAuth(authResponce: AuthenticationResponse): void {
    localStorage.setItem('token', authResponce.token);
    localStorage.setItem('roles', authResponce.roles);
    localStorage.setItem('login', authResponce.login);
  }

  public isAdmin(): boolean {
    localStorage.get('roles').array.forEach((element: string) => {
      if (element === 'ROLE_ADMIN') {
        return true;
      }
    });
    return false;
  }

  public cleanUserAuth(): void {
    localStorage.clear();
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }
}
