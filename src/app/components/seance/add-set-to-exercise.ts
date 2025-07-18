import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'add-set-to-exercise',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" class="flex flex-col gap-4 p-4">
      <label class="text-left">
        <span class="block mb-1 font-semibold">Numéro du set</span>
        <input type="number" [(ngModel)]="set_number" name="set_number" class="w-full rounded border px-2 py-1" required min="1" />
      </label>
      <label class="text-left">
        <span class="block mb-1 font-semibold">Poids (kg)</span>
        <input type="number" [(ngModel)]="weight" name="weight" class="w-full rounded border px-2 py-1" required min="0" />
      </label>
      <label class="text-left">
        <span class="block mb-1 font-semibold">Reps</span>
        <input type="number" [(ngModel)]="reps" name="reps" class="w-full rounded border px-2 py-1" required min="1" />
      </label>
      <label class="text-left">
        <span class="block mb-1 font-semibold">Repos (s)</span>
        <input type="number" [(ngModel)]="rest_time" name="rest_time" class="w-full rounded border px-2 py-1" required min="0" />
      </label>
      <button type="submit" class="mt-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">Ajouter le set</button>
    </form>
  `,
  styles: []
})
export class AddSetToExercise {
  @Output() addSet = new EventEmitter<{ set_number: number; weight: number; reps: number; rest_time: number }>();

  set_number: number = 1;
  weight: number = 0;
  reps: number = 1;
  rest_time: number = 60;

  onSubmit() {
    this.addSet.emit({ set_number: this.set_number, weight: this.weight, reps: this.reps, rest_time: this.rest_time });
  }
} 