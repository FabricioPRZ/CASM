import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Publication } from '../models/publication';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private apiUrl = 'http://127.0.0.1:8000/publications/';

  constructor(private http: HttpClient) {}

  // Método para crear publicación
  createPublication(formData: FormData): Observable<Publication> {
    // No es necesario establecer las cabeceras para multipart/form-data
    return this.http.post<Publication>(this.apiUrl, formData)
      .pipe(catchError(this.handleError));
  }

  // Obtener todas las publicaciones
  getPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // Obtener publicación por ID
  getPublicationById(publicationId: string): Observable<Publication> {
    return this.http.get<Publication>(`${this.apiUrl}${publicationId}`)
      .pipe(catchError(this.handleError));
  }

  // Actualizar publicación
  updatePublication(id: string, formData: FormData): Observable<Publication> {
    return this.http.put<Publication>(`${this.apiUrl}${id}`, formData)
      .pipe(catchError(this.handleError));
  }

  // Eliminar publicación
  deletePublication(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('Error occurred:', error);
    return throwError(() => error);
  }
}
