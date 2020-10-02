import { OrderService } from './order.service';
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

  // readonly uri = `http://localhost:8080/auth/login`;
  readonly URL = `http://localhost:8080/rest/auth/login`;


  constructor(
    private http: HttpClient,
    private orderService: OrderService) { }

  public login(user: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post(this.URL, user)
      .pipe(tap(this.saveUserAuth));
  }

  public logout(): void {
    this.cleanUserAuth();
    this.orderService.cleanCart();
  }

  public saveUserAuth(authResponce: AuthenticationResponse): void {
    localStorage.setItem('token', authResponce.token);
    localStorage.setItem('roles', authResponce.roles);
    localStorage.setItem('login', authResponce.login);
  }

  public cleanUserAuth(): void {
    localStorage.clear();
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public getUserName(): string {
    return localStorage.getItem('login');
  }

  public isAuth(): boolean {
    const isAuthUser = this.getToken();
    if (isAuthUser) {
      return true;
    }
    return false;
  }

  public isAdmin(): boolean {
    const role = localStorage.getItem('roles');
    return (role === 'ROLE_ADMIN');
  }
}
