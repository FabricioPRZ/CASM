import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VoluntaryUser } from '../models/VoluntaryUser';

@Injectable({
  providedIn: 'root',
})
export class DirectoryService {
  private apiUrl = 'http://127.0.0.1:8000/voluntarios/';

  constructor(private http: HttpClient) {}

  getVoluntaryUsers(): Observable<VoluntaryUser[]> {
    return this.http.get<VoluntaryUser[]>(this.apiUrl);
  }
}
