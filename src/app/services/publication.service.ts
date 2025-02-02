import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publication } from '../models/publication';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private baseUrl = 'http://127.0.0.1:8000/publications/all';
  private userPublications = 'http://127.0.0.1:8000/publications/';
  private baseImageUrl = 'http://127.0.0.1:8000/';
  
  constructor(private http: HttpClient) {}

  getPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.baseUrl).pipe(
      map((publications: Publication[]) => {
        console.log('Antes del mapeo:', publications);
        const mappedPublications = publications.map(publication => ({
          ...publication,
          image: publication.image ? `${this.baseImageUrl}${publication.image}` : null,
          user_name: publication.user_name,
          photo_profile: publication.profile_img,
          id_publication: publication.id_publication,
        }));
        console.log('Después del mapeo:', mappedPublications);
        return mappedPublications;
      })
    );
  }  

  getPublicationsUser(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.userPublications).pipe(
      map((publications: Publication[]) =>
        publications.map(publication => ({
          ...publication,
          image: publication.image ? `${this.baseImageUrl}${publication.image}`: null,
          user_name: publication.user_name,
          photo_profile: publication.profile_img,
          id_publication: publication.id_publication
        }))
      )
    );
  }

  getPublicationById(id_publication: string): Observable<Publication> {
    return this.http.get<Publication>(`${this.baseUrl}${id_publication}`);
  }

  createPublication(description: string, image?: File): Observable<Publication> {
    const formData = new FormData();
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }
    return this.http.post<Publication>(this.userPublications, formData);
  }

  updatePublication(id_publication: string, description?: string, image?: File): Observable<Publication> {
    const formData = new FormData();
    if (description) {
      formData.append('description', description);
    }
    if (image) {
      formData.append('image', image);
    }
    return this.http.put<Publication>(`${this.userPublications}${id_publication}`, formData);
  }

  deletePublication(id_publication: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.userPublications}${id_publication}`);
  }
}
