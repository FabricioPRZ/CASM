import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/users/';
  private profileUrl = `${this.apiUrl}profile`;
  private uploadImageUrl = `${this.apiUrl}users/1/profile-image`;

  constructor(private http: HttpClient) {}

  // Método para registrar un nuevo usuario
  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // Método para iniciar sesión
  loginUser(loginData: { email: string; password: string }): Observable<any> {
    return this.http.post<any>('http://localhost:8000/login/', loginData);
  }

  // Método para obtener el perfil del usuario
  getUserProfile(): Observable<User> {
    return this.http.get<User>(this.profileUrl);
  }

  // Método para actualizar el perfil del usuario
  updateUserProfile(user: User): Observable<User> {
    return this.http.put<User>(this.profileUrl, user);
  }

  // Método para subir una nueva imagen de perfil
  uploadProfileImage(formData: FormData): Observable<string> {
    return this.http.post<string>(this.uploadImageUrl, formData);
  }
}
