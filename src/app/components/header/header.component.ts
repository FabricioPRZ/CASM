import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  userProfileImage: string = '';
  userName: string = '';
  isMobileMenuOpen: boolean = false;
  isMobileView: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.updateViewMode();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateViewMode();
  }

  updateViewMode(): void {
    this.isMobileView = window.innerWidth <= 767;
    if (!this.isMobileView) {
      this.isMobileMenuOpen = false;
    }
  }

  checkLoginStatus(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.isLoggedIn = true;

      this.userProfileImage = localStorage.getItem('userProfileImage') || 'default-profile.png';
      this.userName = localStorage.getItem('userName') || 'Usuario';
    }
  }

  toggleMobileMenu(): void {
    if (this.isMobileView) {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }
  }

  redirect_to_login(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/login']);
  }

  redirect_to_home(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/home']);
  }

  redirect_to_about(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/about']);
  }

  redirect_to_directory(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/directory']);
    this.isMobileMenuOpen = false;
  }

  redirect_to_premium(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/premium']);
    this.isMobileMenuOpen = false;
  }

  logout(event: Event): void {
    event.preventDefault();
    localStorage.clear(); // Limpia los datos del usuario
    this.isLoggedIn = false;
    this.isMobileMenuOpen = false; // Cierra el menú
    this.router.navigate(['/login']); // Redirige al login
  }
}
