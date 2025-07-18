import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Exercises } from '../../services/exercises/exercises';
import { Exercise } from '../../models/exercise.model';

@Component({
  selector: 'add-exercise-to-session',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" class="flex flex-col gap-4 p-4">
      <label class="text-left">
        <span class="block mb-1 font-semibold">Exercice</span>
        <select [(ngModel)]="selectedExerciseId" name="exercise" class="w-full rounded border px-2 py-1">
          <option *ngFor="let ex of exercises" [value]="ex.id">{{ ex.name }}</option>
        </select>
      </label>
      <div *ngIf="selectedExercise" class="text-sm text-gray-600 dark:text-gray-300">
        <div><span class="font-semibold">Groupe musculaire :</span> {{ selectedExercise.muscle_group }}</div>
        <div><span class="font-semibold">Description :</span> {{ selectedExercise.description }}</div>
      </div>
      <button type="submit" class="mt-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">Ajouter</button>
    </form>
  `,
  styles: []
})
export class AddExerciseToSession implements OnInit {
  @Output() add = new EventEmitter<number>();

  exercises: Exercise[] = [];
  selectedExerciseId: number | null = null;

  constructor(private exercisesService: Exercises) {}

  ngOnInit() {
    this.exercisesService.getExercises().subscribe(exs => {
      this.exercises = exs;
      if (exs.length > 0) {
        this.selectedExerciseId = exs[0].id;
      }
    });
  }

  get selectedExercise() {
    return this.exercises.find(ex => ex.id === this.selectedExerciseId);
  }

  onSubmit() {
    if (this.selectedExerciseId !== null) {
      this.add.emit(this.selectedExerciseId);
    }
  }
} 