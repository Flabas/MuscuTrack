import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Program } from '../../models/program.model';
import { Programs } from '../../services/programs/programs';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Session } from '../../models/session.model';
import { Sessions } from '../../services/sessions/sessions';
import { Pipe, PipeTransform } from '@angular/core';
import { ProgramForm } from '../program-form/program-form';
import { RouterModule } from '@angular/router';
import { SessionForm } from '../session-form/session-form';

@Pipe({ name: 'orderByDate', standalone: true })
export class OrderByDatePipe implements PipeTransform {
  transform(array: any[], direction: 'asc' | 'desc' = 'asc'): any[] {
    if (!Array.isArray(array)) return array;
    return array.slice().sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return direction === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, DatePipe, HttpClientModule, OrderByDatePipe, ProgramForm, SessionForm, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  public isConnected = false;
  public username: string | null = null;
  public programs: Program[] = [];
  public sessions: Session[] = [];
  public showProgramForm = false;
  public editingProgram: Program | null = null;
  public loading = false;
  public successMessage: string | null = null;
  public errorMessage: string | null = null;
  public showSessionForm = false;
  public editingSession: Session | null = null;
  public errorMessageSession: string | null = null;
  public loadingSession = false;

  constructor(private programsService: Programs, private sessionsService: Sessions) {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    this.isConnected = !!token;
    this.username = username;
    if (this.isConnected) {
      this.loading = true;
      this.programsService.getPrograms().subscribe((programs) => {
        this.programs = programs;
        this.sessions = [];
        if (this.programs.length === 0) {
          this.loading = false;
        }
        let loadedCount = 0;
        for (const program of this.programs) {
          this.programsService.getSessions(program.id).subscribe({
            next: (sessions) => {
              this.sessions = this.sessions.concat(sessions);
            },
            complete: () => {
              loadedCount++;
              if (loadedCount === this.programs.length) {
                this.loading = false;
              }
            },
            error: () => {
              loadedCount++;
              if (loadedCount === this.programs.length) {
                this.loading = false;
              }
            }
          });
        }
      }, (err) => {
        this.loading = false;
      });
    }
  }

  openProgramForm(program: Program | null = null) {
    this.editingProgram = program;
    this.showProgramForm = true;
    this.errorMessage = null;
    this.successMessage = null;
  }

  closeProgramForm() {
    this.showProgramForm = false;
    this.editingProgram = null;
    this.errorMessage = null;
    this.successMessage = null;
  }

  async handleProgramFormSubmit(programData: any) {
    this.loading = true;
    this.errorMessage = null;
    this.successMessage = null;
    if (this.editingProgram) {
      // Edition
      this.programsService.updateProgram(this.editingProgram.id, {
        ...this.editingProgram,
        ...programData
      }).subscribe({
        next: (updated) => {
          const idx = this.programs.findIndex(p => p.id === updated.id);
          if (idx !== -1) this.programs[idx] = updated;
          this.successMessage = 'Programme modifié avec succès.';
          this.closeProgramForm();
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || 'Erreur lors de la modification.';
          this.loading = false;
        }
      });
    } else {
      // Création
      this.programsService.createProgram(programData).subscribe({
        next: (created) => {
          this.programs = [created, ...this.programs];
          this.successMessage = 'Programme créé avec succès.';
          this.closeProgramForm();
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || 'Erreur lors de la création.';
          this.loading = false;
        }
      });
    }
  }

  openSessionForm(session: Session | null = null) {
    this.editingSession = session;
    this.showSessionForm = true;
    this.errorMessageSession = null;
  }

  closeSessionForm() {
    this.showSessionForm = false;
    this.editingSession = null;
    this.errorMessageSession = null;
  }

  handleSessionFormSubmit(sessionData: any) {
    this.loadingSession = true;
    this.errorMessageSession = null;
    if (this.editingSession) {
      // Edition
      this.sessionsService.updateSession(String(this.editingSession.id), sessionData).subscribe({
        next: () => {
          // Recharge toutes les sessions après update
          this.sessions = [];
          let loadedCount = 0;
          for (const program of this.programs) {
            this.programsService.getSessions(program.id).subscribe({
              next: (sessions) => {
                this.sessions = this.sessions.concat(sessions);
              },
              complete: () => {
                loadedCount++;
                if (loadedCount === this.programs.length) {
                  this.closeSessionForm();
                  this.loadingSession = false;
                }
              },
              error: () => {
                loadedCount++;
                if (loadedCount === this.programs.length) {
                  this.closeSessionForm();
                  this.loadingSession = false;
                }
              }
            });
          }
        },
        error: (err) => {
          this.errorMessageSession = err?.error?.message || 'Erreur lors de la modification.';
          this.loadingSession = false;
        }
      });
    } else {
      // Création
      this.programsService.createSession(sessionData.program_id, sessionData.date, sessionData.notes).subscribe({
        next: (created) => {
          this.sessions = [created, ...this.sessions];
          this.closeSessionForm();
          this.loadingSession = false;
        },
        error: (err) => {
          this.errorMessageSession = err?.error?.message || 'Erreur lors de la création.';
          this.loadingSession = false;
        }
      });
    }
  }

  getProgramName(programId: number | string): string {
    const program = this.programs.find(p => p.id == programId);
    return program ? program.name : '-';
  }

  getLastSessionDate(): string {
    if (!this.sessions.length) return '-';
    const sorted = [...this.sessions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return new Date(sorted[0].date).toLocaleDateString('fr-FR');
  }

  getSessionCountForProgram(programId: number | string): number {
    return this.sessions.filter(s => s.program_id == programId).length;
  }

  deleteProgram(id: string) {
    this.errorMessage = null;
    this.successMessage = null;
    this.programsService.deleteProgram(id).subscribe({
      next: () => {
        this.programs = this.programs.filter(p => p.id !== id);
        this.successMessage = 'Programme supprimé avec succès.';
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Erreur lors de la suppression.';
      }
    });
  }

  deleteSession(id: string) {
    this.sessionsService.deleteSession(String(id)).subscribe({
      next: () => {
        this.sessions = this.sessions.filter(s => String(s.id) !== String(id));
      },
      error: (err) => {
        this.errorMessageSession = err?.error?.message || 'Erreur lors de la suppression.';
      }
    });
  }
}
