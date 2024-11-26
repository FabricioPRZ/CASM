import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { catchError } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://casmback.integrador.xyz/users/';
  private loginUrl = 'https://casmback.integrador.xyz/login';

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  loginUser(loginData: { email: string; password: string }): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('accept', 'application/json');
      
    return this.http.post<any>(this.loginUrl, loginData, { headers }).pipe(
      catchError(error => {
        // Manejo de error para login
        console.error('Error en inicio de sesión:', error);
        return of({ error: true, message: 'No se pudo iniciar sesión. Verifica tus credenciales.' });
      })
    );
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
