import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  constructor(private router: Router) {}

  async onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const username = (form['username'] as HTMLInputElement).value;
    const password = (form['password'] as HTMLInputElement).value;

    try {
      const response = await fetch('https://muscu-api.vercel.app/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.user.username);
        localStorage.setItem('userId', data.user.id);
        this.router.navigate(['/']);
      } else {
        alert(data.message || 'Erreur de connexion');
      }
    } catch (error) {
      alert('Erreur réseau');
    }
  }
}
