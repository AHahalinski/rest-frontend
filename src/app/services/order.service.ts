import { Certificate } from './../shared/entity/Certificate';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Order } from '../shared/entity/order';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  readonly URL_BASE = `http://localhost:8080/users/orders`;
  readonly SIZE = '?size=100';
  // readonly URL_BASE = `http://localhost:8080/rest/users/orders`;

  private certificates: Certificate[] = JSON.parse(sessionStorage.getItem('cart')) || [];
  count$ = new BehaviorSubject<number>(this.certificates.length);
  setSertificates$ = new BehaviorSubject<Certificate[]>(this.getSetCertificates(this.certificates));
  totalPrice$ = new BehaviorSubject<number>(this.getTotalPrice(this.certificates));
  mapIdAmount$;

  constructor(private http: HttpClient) {
    this.mapIdAmount$ = new BehaviorSubject<Map<number, number>>(this.getMapCertificates(this.certificates));
  }

  public getCertificates(): BehaviorSubject<Certificate[]> {
    return new BehaviorSubject<Certificate[]>(this.certificates);
  }

  public getMapCertificates(certificates: Certificate[]): Map<number, number> {
    const mapCertifacates = new Map();
    certificates.forEach(
      (certificate) => {
        if (!mapCertifacates.has(certificate.id)) {
          mapCertifacates.set(certificate.id, 1);
        } else {
          mapCertifacates.set(certificate.id, mapCertifacates.get(certificate.id) + 1);
        }
      }
    );
    return mapCertifacates;
  }

  public getSetCertificates(certificates: Certificate[]): Certificate[] {
    const arrayIds = Array.from(this.getMapCertificates(certificates).keys());
    const setCertificates: Certificate[] = [];
    for (let k = 0; k < arrayIds.length; k++) {
      certificates.forEach(certificate => {
        if (certificate.id === arrayIds[k]) {
          setCertificates.push(certificate);
          k++;
        }
      });
    }
    return setCertificates;
  }

  public getTotalPrice(certificates: Certificate[]): number {
    let totalPrice = 0;
    certificates.forEach(
      c => totalPrice = totalPrice + c.price);
    return totalPrice;
  }

  public add(certificate: Certificate): void {
    this.certificates.push(certificate);
    sessionStorage.setItem('cart', JSON.stringify(this.certificates));
    this.synchronizeData();
  }

  public remove(certificate: Certificate): void {
    const temp: Certificate[] = [];
    let isDelete = false;
    this.certificates.forEach(cert => {
      if (certificate.id === cert.id && !isDelete) {
        isDelete = true;
      } else {
        temp.push(cert);
      }
    });
    this.certificates = temp;
    sessionStorage.setItem('cart', JSON.stringify(this.certificates));
    if (this.certificates.length === 0) {
      window.location.reload();
    } else {
      this.synchronizeData();
    }
  }

  public cleanCart(): void {
    this.certificates = [];
    sessionStorage.setItem('cart', JSON.stringify(this.certificates));
    this.synchronizeData();
  }

  public save(): Observable<any> {
    if (this.certificates.length > 0) {
      return this.http.post<Certificate>(`${this.URL_BASE}`, new Order(this.certificates), { observe: 'response' });
    }
  }

  public getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.URL_BASE}/${id}`).pipe(
      map(data => data)
    );
  }

  public getAllUserOrders(): Observable<any> {
    return this.http.get<any>(`${this.URL_BASE}${this.SIZE}`);
  }

  private synchronizeData(): void {
    this.count$.next(this.certificates.length);
    this.setSertificates$.next(this.getSetCertificates(this.certificates));
    this.totalPrice$.next(this.getTotalPrice(this.certificates));
    this.mapIdAmount$.next(this.getMapCertificates(this.certificates));
  }
}
