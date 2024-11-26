import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export function AuthInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const token = localStorage.getItem('access_token');

  if (token) {
    // Clonamos la solicitud para agregarle el token a las cabeceras
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`, // Agregar el token en la cabecera Authorization
        Accept: 'application/json',
        'Content-Type': 'application/json', // Dependiendo de lo que requiera tu backend
      },
    });

    console.log('Interceptando solicitud:', clonedRequest);
    return next(clonedRequest);
  }

  return next(req); // Si no hay token, simplemente sigue con la solicitud original
}
