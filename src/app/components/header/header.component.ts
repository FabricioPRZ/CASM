import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Importar AuthService

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

  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    // Verifica si hay un token en localStorage
    const token = localStorage.getItem('access_token');
    if (token) {
      // Lógica para verificar si el token es válido
      this.authService.setLoggedIn(true);  // Si el token es válido, mantiene la sesión activa
    } else {
      this.authService.setLoggedIn(false);  // Si no hay token, redirige al login
    }
  
    this.authService.loggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
  
      if (status) {
        this.userProfileImage = localStorage.getItem('userProfileImage') || 'default-profile.png';
        this.userName = localStorage.getItem('userName') || 'Usuario';
      } else {
        this.userProfileImage = '';
        this.userName = '';
      }
    });
  
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
    this.router.navigate(['/feed']);
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
    localStorage.clear();
    this.authService.setLoggedIn(false);
    this.isMobileMenuOpen = false;
    this.router.navigate(['/login']);
  }
}
