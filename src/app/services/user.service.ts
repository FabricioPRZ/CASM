import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://casmback.integrador.xyz/users/';
  private loginUrl = 'https://casmback.integrador.xyz/login';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('access_token') || localStorage.getItem('access_token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }

  loginUser(any: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.loginUrl}`, any).pipe(
      tap((response: { access_token: string }) => {
        const expirationTime = 30 * 60 * 1000;
        const now = new Date().getTime();
        localStorage.setItem('access_token', response.access_token);
      }),
      catchError((error) => {
        console.error('Error de login', error);
        throw error;
      })
    );
  }

  validateToken(): Observable<boolean> {
    return this.http
      .get<{ valid: boolean }>(`${this.loginUrl}validate-token`, { headers: this.getHeaders() })
      .pipe(
        map((response) => response.valid),
        catchError((error) => {
          console.error('Error al validar el token:', error);
          return [false];
        })
      );
  }

  isTokenExpired(): boolean {
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (tokenExpiration) {
      const currentTime = new Date().getTime();
      return currentTime > parseInt(tokenExpiration);
    }
    return true;
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
  }

  getUserProfile(token: string): Observable<User> {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<User>(`${this.apiUrl}me`, { headers });
  }

  registerUser(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }

  updateUserProfile(formData: FormData): Observable<User> {
    const headers = this.getHeaders();
    return this.http.put<User>(`${this.apiUrl}me`, formData, { headers }).pipe(
      tap((updatedUser: User) => {
        const storedToken = localStorage.getItem('access_token');
        if (storedToken) {
          localStorage.setItem('userProfile', JSON.stringify(updatedUser));
        }
      }),
      catchError((error) => {
        console.error('Error al actualizar el perfil', error);
        throw error;
      })
    );
  }

  updatePremiumStatus(): Observable<User> {
    const headers = this.getHeaders();
    const body = { premium: true };

    return this.http.put<User>(`${this.apiUrl}me`, body, { headers }).pipe(
      tap((updatedUser: User) => {
        const storedToken = localStorage.getItem('access_token');
        if (storedToken) {
          localStorage.setItem('userProfile', JSON.stringify(updatedUser));
        }
      }),
      catchError((error) => {
        console.error('Error al actualizar el perfil', error);
        throw error;
      })
    );
  }

  // Método para eliminar el perfil del usuario
  deleteUserProfile(): Observable<any> {
    return this.http.delete(`${this.apiUrl}me`).pipe(
      tap(() => {
        localStorage.removeItem('userProfile');
      }),
      catchError((error) => {
        console.error('Error al eliminar el perfil', error);
        throw error;
      })
    );
  }
}
