import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { catchError } from 'rxjs';
import { of } from 'rxjs';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/users/';
  private loginUrl = 'http://127.0.0.1:8000/login';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders{
    const token = sessionStorage.getItem('access_token') || localStorage.getItem('access_token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }

  // Método para iniciar sesión
  loginUser(any: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.loginUrl}`, any).pipe(
      tap((response: { access_token: string; })=>{
        const expirationTime = 30 * 60 * 1000;
        const now = new Date().getTime();

        localStorage.setItem('access_token', response.access_token);
      }),
      catchError((error)=>{
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

  logout(){
    sessionStorage.clear();
    localStorage.clear();
  }
  
  // Método para obtener el perfil del usuario, utilizando el token
  getUserProfile(token: string): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}profile`, { headers });
  }

  // Método para verificar si el usuario es premium
  isUserPremium(token: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<boolean>(`${this.apiUrl}is-premium`, { headers });
  }

  // Método para registrar un nuevo usuario
  registerUser(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }

  // Método para actualizar el perfil del usuario
  updateUserProfile(user: User, token: string): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<User>(`${this.apiUrl}${user.id}/profile`, user, { headers });
  }

  // Método para subir una nueva imagen de perfil
  uploadProfileImage(formData: FormData, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}profile-image`, formData, { headers });
  }
}
