import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Publication } from '../models/publication';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private apiUrl = 'https://casmback.integrador.xyz/publications/';

  constructor(private http: HttpClient) {}

  // Crear una nueva publicación
  createPublication(formData: FormData): Observable<Publication> {
    return this.http.post<Publication>(this.apiUrl, formData).pipe(
      catchError(this.handleError)
    );
  }
  
  

  // Obtener todas las publicaciones
  getPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.apiUrl);
  }

  // Obtener una publicación por su ID
  getPublicationById(publicationId: number): Observable<Publication> {
    return this.http.get<Publication>(`${this.apiUrl}${publicationId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar una publicación
  updatePublication(publication: Publication): Observable<Publication> {
    const formData = new FormData();
    formData.append('description', publication.description);
    if (publication.image) {
      formData.append('image', publication.image); // Asegúrate de que `publication.image` sea un archivo.
    }
  
    return this.http.put<Publication>(`${this.apiUrl}${publication.id}`, formData, {
      headers: { Accept: 'application/json' },
    }).pipe(
      catchError(this.handleError)
    );
  }
  

  // Eliminar una publicación
  deletePublication(publicationId: number): Observable<Publication> {
    return this.http.delete<Publication>(`${this.apiUrl}${publicationId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores centralizado
  private handleError(error: any): Observable<never> {
    console.error('Ocurrió un error en la solicitud:', error);
    return throwError(() => error);
  }
}
