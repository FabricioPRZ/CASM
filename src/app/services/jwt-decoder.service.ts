import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtDecoderService {
  constructor() {}

  public decodeToken(token: string): any {
    try {
      // Dividir el token y extraer el payload (segunda parte del token)
      const base64Url = token.split('.')[1]; // Cambiar ',' a '.'
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      
      // Decodificar el payload
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null; // Devolver `null` si ocurre un error
    }
  }
}
