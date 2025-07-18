import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MuscuTrack');

  public isConnected = false;
  public username: string | null = null;

  constructor() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    this.isConnected = !!token;
    this.username = username;
  }
}
