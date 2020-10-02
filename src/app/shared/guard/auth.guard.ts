import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.isAuth()) {
      return true;
    }
    this.router.navigateByUrl('/**');
    return false;
  }
}
