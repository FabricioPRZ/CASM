import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { JwtDecoderService } from '../../services/jwt-decoder.service'; // Importar el servicio de decodificación

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  userProfileImage: string = '';
  userName: string = '';
  isMobileMenuOpen: boolean = false;
  isMobileView: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private jwtDecoderService: JwtDecoderService // Inyectar el servicio de decodificación
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');

    if (token) {
      try {
        // Decodificar el token para obtener datos del usuario
        const decodedToken = this.jwtDecoderService.decodeToken(token);

        if (decodedToken) {
          this.userName = decodedToken.name || 'Usuario'; // Cambiar "name" al campo correcto del token
          console.log('Token decodificado correctamente:', decodedToken);
        } else {
          console.warn('El token no contiene datos válidos.');
        }

        // Marcar la sesión como activa si el token es válido
        this.authService.setLoggedIn(true);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        this.authService.setLoggedIn(false);
      }
    } else {
      console.warn('No se encontró un token de acceso en localStorage.');
      this.authService.setLoggedIn(false);
    }

    // Suscribirse al estado de autenticación
    this.authService.loggedIn$.subscribe((status) => {
      this.isLoggedIn = status;

      if (status) {
        this.userProfileImage =
          localStorage.getItem('userProfileImage') || 'usuario.png';
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

  redirect_to_profile(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/profile']);
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
