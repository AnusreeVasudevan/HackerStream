import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Story {
  id: number;
  title: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class HackerNews {
  constructor(private http: HttpClient) {}

  getStories(page: number, query?: string): Observable<Story[]> {
    let params = new HttpParams().set('page', page);
    if (query) {
      params = params.set('query', query);
    }
    return this.http.get<Story[]>('/api/stories', { params });
  }
}
