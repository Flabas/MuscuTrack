import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Exercise } from '../../models/exercise.model';

@Component({
  selector: 'change-exercise-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" class="flex flex-col gap-4 p-4">
      <label class="text-left">
        <span class="block mb-1 font-semibold">Choisir un exercice</span>
        <select [(ngModel)]="selectedExerciseId" name="exercise" class="w-full rounded border px-2 py-1">
          <option *ngFor="let ex of exercises" [value]="ex.id">{{ ex.name }}</option>
        </select>
      </label>
      <button type="submit" class="mt-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">Remplacer</button>
    </form>
  `,
  styles: []
})
export class ChangeExerciseForm {
  @Input() exercises: Exercise[] = [];
  @Input() currentExerciseId!: number;
  @Output() changeExercise = new EventEmitter<number>();

  selectedExerciseId: number | null = null;

  ngOnInit() {
    this.selectedExerciseId = this.currentExerciseId;
  }

  onSubmit() {
    console.log('submit', this.selectedExerciseId, this.currentExerciseId);
    if (this.selectedExerciseId !== null && this.selectedExerciseId !== this.currentExerciseId) {
      this.changeExercise.emit(this.selectedExerciseId);
    }
  }
} 