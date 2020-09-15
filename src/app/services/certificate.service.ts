import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  private uri = `http://localhost:8080/rest/certificates?page=1&size=10&nameTag=&search&sortBy=ASC`;

  constructor(private http: HttpClient) { }

  getCertificates(): Observable<any> {
    return this.http.get<any>(this.uri);
  }
}
