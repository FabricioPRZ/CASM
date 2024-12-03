import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private apiUrl = 'https://casmback.integrador.xyz/favorites/';

  constructor(private http: HttpClient) {}

  getFavorites(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createFavorite(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  deleteFavorite(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}`);
  }
}
