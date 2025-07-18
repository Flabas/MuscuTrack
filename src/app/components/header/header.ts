import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  showMenu = false;

  get isConnected(): boolean {
    return !!localStorage.getItem('token');
  }

  get username(): string | null {
    return localStorage.getItem('username');
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    window.location.reload();
  }
}
