import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); // Estado inicial: no logueado
  loggedIn$ = this.loggedIn.asObservable(); // Observable para suscribirse al estado

  setLoggedIn(status: boolean): void {
    this.loggedIn.next(status); // Actualiza el estado
  }

  isLoggedIn(): boolean {
    return this.loggedIn.getValue(); // Devuelve el estado actual
  }
}
