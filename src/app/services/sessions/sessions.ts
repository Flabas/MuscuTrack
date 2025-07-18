import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from '../../models/session.model';
import { HttpClient } from '@angular/common/http';
import { SessionExercise } from '../../models/sessionExercises.model';

@Injectable({
  providedIn: 'root'
})
export class Sessions {
  private apiUrl = 'https://muscu-api.vercel.app/sessions';
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  getSession(id: string): Observable<Session> {
    const token = localStorage.getItem('token');
    return this.http.get<Session>(`${this.apiUrl}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  createSession(session: Session): Observable<Session> {
    const token = localStorage.getItem('token');
    return this.http.post<Session>(this.apiUrl, session, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  updateSession(id: string, session: Session): Observable<Session> {
    const token = localStorage.getItem('token');
    return this.http.patch<Session>(`${this.apiUrl}/${id}`, session, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  deleteSession(id: string): Observable<void> {
    const token = localStorage.getItem('token');
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  getSessionExercises(id: string): Observable<SessionExercise[]> {
    const token = localStorage.getItem('token');
    return this.http.get<SessionExercise[]>(`${this.apiUrl}/${id}/exercises`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  createSessionExercise(id: string, exerciseId: number, order: number): Observable<SessionExercise> {
    const token = localStorage.getItem('token');
    return this.http.post<SessionExercise>(`${this.apiUrl}/${id}/exercises`, {
      exercise_id: exerciseId,
      order: order
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}

