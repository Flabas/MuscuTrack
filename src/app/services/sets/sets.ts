import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Set } from '../../models/set.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Sets {
  private apiUrl = 'https://muscu-api.vercel.app/sets';

  constructor(private http: HttpClient) {}

  updateSet(id: string, set: Set): Observable<Set> {
    const token = localStorage.getItem('token');
    return this.http.put<Set>(`${this.apiUrl}/${id}`, set, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  deleteSet(id: string): Observable<void> {
    const token = localStorage.getItem('token');
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
