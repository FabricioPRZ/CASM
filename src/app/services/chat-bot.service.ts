import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ChatBotService {
  private apiKey: string = environment.API_KEY; // Usamos la clave del entorno
  private apiUrl: string = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<any> {
    // Estructura del mensaje para la API de Gemini
    const payload = {
      contents: [
        {
          parts: [
            {
              text: message, // El texto que el usuario envía
            }
          ]
        }
      ]
    };

    // Realiza la solicitud POST a la API de Gemini
    return this.http.post(this.apiUrl, payload, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
    });
  }
}
