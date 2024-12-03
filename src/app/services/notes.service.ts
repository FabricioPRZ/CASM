import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private readonly apiUrl = 'https://casmback.integrador.xyz/notes/';

  constructor(private http: HttpClient) {}

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }

  createNote(note: Partial<Note>): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note);
  }

  getNoteById(noteId: string): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}${noteId}`);
  }

  updateNote(noteId: string, note: Partial<Note>): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}${noteId}`, note);
  }

  deleteNote(noteId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${noteId}`);
  }
}
