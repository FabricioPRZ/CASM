import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VoluntaryUser } from '../models/VoluntaryUser';

@Injectable({
  providedIn: 'root',
})
export class DirectoryService {
  private apiUrl = 'https://casmback.integrador.xyz/voluntarios/';

  constructor(private http: HttpClient) {}

  getVoluntaryUsers(): Observable<VoluntaryUser[]> {
    return this.http.get<VoluntaryUser[]>(this.apiUrl);
  }
}
