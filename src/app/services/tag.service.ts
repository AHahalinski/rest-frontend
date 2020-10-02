import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../shared/entity/Tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  // readonly BASE_URL = `http://localhost:8080/tags`;
  readonly BASE_URL = `http://localhost:8080/rest/tags`;


  constructor(private http: HttpClient) { }

  public getTags(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/?page=1&size=30`);
  }

  public getTagById(id: number): Observable<Tag> {
    return this.http.get<Tag>(`${this.BASE_URL}/${id}`);
  }

  public create(tag: Tag): Observable<any> {
    return this.http.post<Tag>(`${this.BASE_URL}`, tag, { observe: 'response' });
  }

  public update(id: number, tag: Tag): Observable<any> {
    return this.http.put<Tag>(`${this.BASE_URL}/${id}`, tag, { observe: 'response' });
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/${id}`, { observe: 'response' });
  }
}
