import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Story {
  id: number;
  title: string;
  url: string;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class HackerNews {
  constructor(private http: HttpClient) {}

  getStories(page: number, search?: string, limit = 20): Observable<Story[]> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get<Story[]>('/api/stories', { params });
  }
}
