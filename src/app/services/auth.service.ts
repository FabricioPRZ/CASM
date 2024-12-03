import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  setLoggedIn(status: boolean): void {
    this.loggedIn.next(status);
  }

  isLoggedIn(): boolean {
    return this.loggedIn.getValue();
  }

  getUserData(userId: string, token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<{
      name: string,
      profile_img: string,
      email: string,
      phone: string,
      speciality: string,
      role: string,
      last_name: string,
      document: string,
      id_referency: string,
      premium: boolean
    }>(`https://casmback.integrador.xyz/users/${userId}`, { headers });
  }
}
