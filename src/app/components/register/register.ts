import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  constructor(private router: Router) {}

  async onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const username = (form['username'] as HTMLInputElement).value;
    const password = (form['password'] as HTMLInputElement).value;

    try {
      const response = await fetch('https://muscu-api.vercel.app/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (data.success) {
        alert('Inscription réussie !');
        this.router.navigate(['/login']);
      } else {
        alert(data.message || 'Erreur d\'inscription');
      }
    } catch (error) {
      alert('Erreur réseau');
    }
  }
}
