import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercise } from '../../models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class Exercises {
  private apiUrl = 'https://muscu-api.vercel.app/exercises';
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.apiUrl, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }
  getExercise(id: string): Observable<Exercise> {
    return this.http.get<Exercise>(`${this.apiUrl}/${id}`, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }

  createExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(this.apiUrl, exercise, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }

  updateExercise(id: string, exercise: Exercise): Observable<Exercise> {
    return this.http.put<Exercise>(`${this.apiUrl}/${id}`, exercise, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }

  deleteExercise(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }
}
