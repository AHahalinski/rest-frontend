import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  private authService: AuthService;

  constructor(private injector: Injector, private router: Router) {
    this.authService = this.injector.get(AuthService);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    if (token) {
      const cloneRequest = req.clone({ setHeaders: { Authorization: `Bearer_${token}` } });
      return next.handle(cloneRequest);
    } else {
      return next.handle(req);
    }
  }
}
