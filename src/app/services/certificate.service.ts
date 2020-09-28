import { Certificate } from './../shared/entity/Certificate';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {


  readonly URL_BASE = `http://localhost:8080/certificates`;
  // readonly URL_BASE = `http://localhost:8080/rest/certificates`;


  constructor(private http: HttpClient) { }

  public getCertificates(currentPage: number, byCertificateName: string, byTagName: string[]): Observable<any> {
    return this.http.get<any>(`${this.URL_BASE}/?page=${currentPage}&size=15&nameTag=${byTagName}&search=${byCertificateName}&sortBy=DESC`);
  }

  public getCertificateById(id: number): Observable<Certificate> {
    return this.http.get<Certificate>(`${this.URL_BASE}/${id}`);
  }

  public update(id: number, certificate: Certificate): Observable<any> {
    return this.http.put<Certificate>(`${this.URL_BASE}/${id}`, certificate, { observe: 'response' });
  }

  public create(certificate: Certificate): Observable<any> {
    return this.http.post<Certificate>(`${this.URL_BASE}`, certificate, { observe: 'response' });
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.URL_BASE}/${id}`, { observe: 'response' });
  }
}
