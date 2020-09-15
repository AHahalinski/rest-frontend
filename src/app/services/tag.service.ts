import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private uri = `http://localhost:8080/rest/tags?page=1&size=30`;

  constructor(private http: HttpClient) { }

  getTags(): Observable<any> {
    return this.http.get<any>(this.uri);
  }
}
