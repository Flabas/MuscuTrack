import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  public isConnected = false;
  public username: string | null = null;

  constructor() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    this.isConnected = !!token;
    this.username = username;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    window.location.reload();
  }
}
