import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sessions } from '../../services/sessions/sessions';
import { Sets } from '../../services/sets/sets';
import { Session } from '../../models/session.model';
import { SessionExercise } from '../../models/sessionExercises.model';
import { Set } from '../../models/set.model';
import { DatePipe } from '@angular/common';
import { SessionExercises } from '../../services/sessionExercises/session-exercises';
import { MatIconModule } from '@angular/material/icon';
import { AddExerciseToSession } from './add-exercise-to-session';
import { AddSetToExercise } from './add-set-to-exercise';
import { Exercise } from '../../models/exercise.model';
import { ChangeExerciseForm } from './change-exercise-form';
import { Exercises } from '../../services/exercises/exercises';

// Ajout du type pour la création d'un set
interface SetCreate {
  set_number: number;
  weight: number;
  reps: number;
  rest_time: number;
}

@Component({
  selector: 'app-seance',
  imports: [DatePipe, MatIconModule, AddExerciseToSession, AddSetToExercise, ChangeExerciseForm],
  templateUrl: './seance.html',
  styleUrl: './seance.css'
})
export class Seance implements OnInit {
  public sessionId: string = '';
  public session: Session | null = null;
  public exercises: SessionExercise[] = [];
  public setsBySessionExercise: { [key: string]: Set[] } = {};
  public loading = false;
  public showAddExercise = false;
  public showAddSet: { [key: number]: boolean } = {};
  public showExerciseForm: { [key: number]: boolean } = {};
  public exercisesList: Exercise[] = [];

  constructor(private route: ActivatedRoute, private sessionsService: Sessions, private sessionExercisesService: SessionExercises, private exercisesService: Exercises) {
    this.sessionId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    if (!this.sessionId) return;
    this.loading = true;
    this.sessionsService.getSession(this.sessionId).subscribe(session => {
      this.session = session;
    });
    this.sessionsService.getSessionExercises(this.sessionId).subscribe(exercises => {
      this.exercises = exercises;
      for (const ex of exercises) {
        this.sessionExercisesService.getSessionExercises(ex.id.toString()).subscribe(sets => {
          this.setsBySessionExercise[ex.id] = sets;
        });
      }
    });
    this.exercisesService.getExercises().subscribe(list => {
      this.exercisesList = list;
    });
  }

  isSetArray(sets: any): boolean {
    return Array.isArray(sets) && sets.length > 0;
  }

  onAddExercise(exerciseId: number) {
    this.sessionsService.createSessionExercise(this.sessionId, exerciseId, this.exercises.length + 1).subscribe(() => {
      // Recharge la liste complète des exercices de la séance
      this.sessionsService.getSessionExercises(this.sessionId).subscribe(exercises => {
        this.exercises = exercises;
        for (const ex of exercises) {
          this.sessionExercisesService.getSessionExercises(ex.id.toString()).subscribe(sets => {
            this.setsBySessionExercise[ex.id] = sets;
          });
        }
      });
      this.showAddExercise = false;
    });
  }

  toggleAddSet(exId: number) {
    this.showAddSet[exId] = !this.showAddSet[exId];
  }

  onAddSet(exId: number, setData: SetCreate) {
    this.sessionExercisesService.createSet(exId.toString(), setData as any).subscribe(set => {
      this.setsBySessionExercise[exId].push(set);
    });
    this.showAddSet[exId] = false;
  }

  deleteExercise(sessionExerciseId: number) {
    this.sessionExercisesService.deleteSessionExercise(sessionExerciseId.toString()).subscribe({
      next: () => {
        console.log('deleteExercise', sessionExerciseId);
        this.exercises = this.exercises.filter(ex => ex.id !== sessionExerciseId);
        delete this.setsBySessionExercise[sessionExerciseId];
      },
      error: err => {
        console.error('API error', err);
      }
    });
  }

  openExerciseForm(exId: number) {
    this.showExerciseForm[exId] = true;
  }

  onUpdateExercise(exId: number, updated: Partial<Exercise>) {
    // À remplacer par la logique d'update réelle
    // Exemple : this.exercisesService.updateExercise(exId, updated).subscribe(...)
    this.showExerciseForm[exId] = false;
  }

  onChangeExercise(sessionExerciseId: number, newExerciseId: number) {
    console.log('onChangeExercise', sessionExerciseId, newExerciseId);
    const sessionExercise = this.exercises.find(ex => ex.id === sessionExerciseId);
    if (!sessionExercise) {
      console.log('SessionExercise not found');
      return;
    }
    // On ne doit envoyer à l'API que les champs attendus pour l'update
    const updatedSessionExercise = {
      order: sessionExercise.order,
      exercise_id: newExerciseId
    };
    this.exercisesService.getExercise(newExerciseId.toString()).subscribe(exercise => {
      sessionExercise.exercise_id = newExerciseId;
      sessionExercise.exercise = exercise || { id: newExerciseId, name: 'Inconnu', description: '', muscle_group: '' };
      this.showExerciseForm[sessionExerciseId] = false;
      this.sessionExercisesService.updateSessionExercise(sessionExerciseId.toString(), updatedSessionExercise).subscribe({
        next: updated => {
          console.log('API success', updated);
        },
        error: err => {
          console.error('API error', err);
        }
      });
    });
  }
}
