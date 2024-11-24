import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publication } from '../models/publication';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private apiUrl = 'https://casmback.integrador.xyz/publications/';

  constructor(private http: HttpClient) {}

  // Crear una nueva publicación
  createPublication(publication: Publication): Observable<Publication> {
    const token = localStorage.getItem('access_token'); // Obtener el token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<Publication>(this.apiUrl, publication, { headers });
  }

  // Obtener todas las publicaciones
  getPublications(token: string): Observable<Publication[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Publication[]>(this.apiUrl, { headers });
  }

  // Obtener una publicación por su ID
  getPublicationById(publicationId: number): Observable<Publication> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Publication>(`${this.apiUrl}${publicationId}`, { headers });
  }

  // Actualizar una publicación
  updatePublication(publication: Publication): Observable<Publication> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Publication>(`${this.apiUrl}${publication.id}`, publication, { headers });
  }

  // Eliminar una publicación
  deletePublication(publicationId: number): Observable<Publication> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<Publication>(`${this.apiUrl}${publicationId}`, { headers });
  }
}
