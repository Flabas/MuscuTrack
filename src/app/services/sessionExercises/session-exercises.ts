import { Injectable } from '@angular/core';
import { SessionExercise } from '../../models/sessionExercises.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Set } from '../../models/set.model';

@Injectable({
  providedIn: 'root'
})
export class SessionExercises {
  private apiUrl = 'https://muscu-api.vercel.app/session-exercises';

  constructor(private http: HttpClient) {}

  getSessionExercises(id: string): Observable<Set[]> {
    const token = localStorage.getItem('token');
    return this.http.get<Set[]>(`${this.apiUrl}/${id}/sets`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  createSessionExercise(id: string, set_number: number, weight: number, reps: number, rest_time: number): Observable<Set> {
    const token = localStorage.getItem('token');
    return this.http.post<Set>(`${this.apiUrl}/${id}/sets`, {
      set_number: set_number,
      weight: weight,
      reps: reps,
      rest_time: rest_time
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  createSet(id: string, set: Set): Observable<Set> {
    const token = localStorage.getItem('token');
    return this.http.post<Set>(`${this.apiUrl}/${id}/sets`, set, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  updateSessionExercise(id: string, sessionExercise: { order: number, exercise_id: number }): Observable<SessionExercise> {
    const token = localStorage.getItem('token');
    return this.http.patch<SessionExercise>(`${this.apiUrl}/${id}`, sessionExercise, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  deleteSessionExercise(id: string): Observable<void> {
    const token = localStorage.getItem('token');
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
