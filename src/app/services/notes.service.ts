import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private apiUrl = 'http://127.0.0.1:8000/notes/';

  constructor(private http: HttpClient) {}

  // Crear una nueva nota
  createNote(note: Omit<Note, 'id' | 'createdAt'>, userId: string): Observable<Note> {
    const newNote = {
      user_id: userId, // Aquí debes pasar el ID del usuario
      title: note.title,
      description: note.description, // Asegúrate de que note.description tenga un valor
      creation_date: new Date().toISOString().split('T')[0], // Fecha en formato YYYY-MM-DD
      modification_date: new Date().toISOString().split('T')[0], // Fecha en formato YYYY-MM-DD
    };
  
    console.log('Objeto enviado al backend:', newNote);  // Asegúrate de que el objeto tenga los valores correctos
  
    return this.http.post<Note>(this.apiUrl, newNote).pipe(
      catchError(this.handleError)
    );
  }  

  // Obtener todas las notas
  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener una nota por ID
  getNoteById(noteId: number): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}${noteId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar una nota
  updateNote(noteId: number, updatedNote: Partial<Note>): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}${noteId}`, updatedNote).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar una nota
  deleteNote(noteId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${noteId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: any): Observable<never> {
    console.error('Error en la solicitud:', error);
    return throwError(() => error);
  }
}
