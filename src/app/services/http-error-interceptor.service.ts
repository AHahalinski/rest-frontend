import { ErrorMessageComponent } from './../shared/components/error-message/error-message.component';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    public dialog: MatDialog,
    private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          console.log(error);
          if (error.error instanceof ErrorEvent) {
            console.log('this is client side error');
            errorMsg = `Error: ${error.error.message}`;
          }
          else {
            console.log('this is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          if (error.status === 401) {
            localStorage.clear();
            this.router.navigateByUrl('/auth/login');
          }
          if (error.status === 403
            || error.status === 400
            || error.status === 409
            || error.status === 404
            || error.status === 500) {
            this.showErrorMessage(error);
          }
          return throwError(errorMsg);
        })
      );
  }

  private showErrorMessage(error: HttpErrorResponse): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Error message',
      error: `${error.error.error}`,
      message: `${error.error.message}`,
      status: `${error.error.status}`,
      time: `${error.error.time}`,
      btnReturn: `Return`
    };

    const dialogRef = this.dialog.open(ErrorMessageComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // this.router.navigate(['./']);
    });
  }
}
