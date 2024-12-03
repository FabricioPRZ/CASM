import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export function AuthInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const token = localStorage.getItem('access_token');

  if (token) {
    const isFormData = req.body instanceof FormData; // Detectar si el cuerpo es FormData

    // Clonamos la solicitud para agregar el token a las cabeceras
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`, // Agregar el token en la cabecera Authorization
        Accept: 'application/json',
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }), // No configurar Content-Type si es FormData
      },
    });

    console.log('Interceptando solicitud:', clonedRequest);
    return next(clonedRequest);
  }

  return next(req); // Si no hay token, simplemente sigue con la solicitud original
}