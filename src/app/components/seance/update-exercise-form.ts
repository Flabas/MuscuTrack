import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Exercise } from '../../models/exercise.model';

@Component({
  selector: 'update-exercise-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" class="flex flex-col gap-4 p-4">
      <label class="text-left">
        <span class="block mb-1 font-semibold">Nom de l'exercice</span>
        <input type="text" [(ngModel)]="formData.name" name="name" class="w-full rounded border px-2 py-1" required />
      </label>
      <label class="text-left">
        <span class="block mb-1 font-semibold">Groupe musculaire</span>
        <input type="text" [(ngModel)]="formData.muscle_group" name="muscle_group" class="w-full rounded border px-2 py-1" required />
      </label>
      <label class="text-left">
        <span class="block mb-1 font-semibold">Description</span>
        <textarea [(ngModel)]="formData.description" name="description" class="w-full rounded border px-2 py-1" rows="2"></textarea>
      </label>
      <button type="submit" class="mt-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">Enregistrer</button>
    </form>
  `,
  styles: []
})
export class UpdateExerciseForm {
  @Input() exercise!: Exercise;
  @Output() updateExercise = new EventEmitter<Partial<Exercise>>();

  formData: Partial<Exercise> = {};

  ngOnInit() {
    if (this.exercise) {
      this.formData = { ...this.exercise };
    }
  }

  onSubmit() {
    this.updateExercise.emit(this.formData);
  }
} 