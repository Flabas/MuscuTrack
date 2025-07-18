import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './session-form.html',
  styleUrl: './session-form.css'
})
export class SessionForm {
  @Input() session: any = null;
  @Input() errorMessage: string | null = null;
  @Input() programs: any[] = [];
  @Output() formSubmit = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      program_id: ['', Validators.required],
      date: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit() {
    if (this.session) {
      this.form.patchValue({
        program_id: this.session.program_id || '',
        date: this.session.date ? this.session.date.substring(0, 10) : '',
        notes: this.session.notes || ''
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