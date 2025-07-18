import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-program-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './program-form.html',
  styleUrl: './program-form.css'
})
export class ProgramForm {
  @Input() program: any = null;
  @Input() errorMessage: string | null = null;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit() {
    if (this.program) {
      this.form.patchValue({
        name: this.program.name,
        description: this.program.description || ''
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.formSubmit.emit(this.form.value);
  }

  onCancel() {
    this.cancel.emit();
  }
}
