import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Program } from '../../models/program.model';
import { Observable } from 'rxjs';
import { Session } from '../../models/session.model';

@Injectable({
  providedIn: 'root'
})
export class Programs {
  private apiUrl = 'https://muscu-api.vercel.app/programs';

  constructor(private http: HttpClient) {}

  getPrograms(): Observable<Program[]> {
    const token = localStorage.getItem('token');
    return this.http.get<Program[]>(this.apiUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  createProgram(program: Program): Observable<Program> {
    const token = localStorage.getItem('token');
    return this.http.post<Program>(this.apiUrl, program, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  deleteProgram(id: string): Observable<void> {
    const token = localStorage.getItem('token');
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  updateProgram(id: string, program: Program): Observable<Program> {
    const token = localStorage.getItem('token');
    return this.http.put<Program>(`${this.apiUrl}/${id}`, program, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  getSessions(programId: string): Observable<Session[]> {
    const token = localStorage.getItem('token');
    return this.http.get<Session[]>(`${this.apiUrl}/${programId}/sessions`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  } 

  createSession(programId: string, date: Date, notes: string): Observable<Session> {
    const token = localStorage.getItem('token');
    return this.http.post<Session>(`${this.apiUrl}/${programId}/sessions`, { date, notes }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}


