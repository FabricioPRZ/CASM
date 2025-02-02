import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { JwtDecoderService } from '../../services/jwt-decoder.service'; 
import { UserService } from '../../services/user.service'; // Asegúrate de importar el UserService
import { User } from '../../models/user'; // Asegúrate de tener el modelo User
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  userProfile: User = {} as User;
  userProfileImage: string = '';
  isMobileMenuOpen: boolean = false;
  isMobileView: boolean = false;
  private userProfileSubject = new BehaviorSubject<User | null>(null);

  constructor(
    private router: Router,
    private authService: AuthService,
    private jwtDecoderService: JwtDecoderService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');

    if (token) {
      try {
        const decodedToken = this.jwtDecoderService.decodeToken(token);

        if (decodedToken) {
        } else {
        }

        this.authService.setLoggedIn(true);

        this.loadUserProfile();
      } catch (error) {
        this.authService.setLoggedIn(false);
      }
    } else {
      this.authService.setLoggedIn(false);
    }

    this.authService.loggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      if (!status) {
        this.userProfileImage = '';
      }
    });

    this.updateViewMode();
  }

  loadUserProfile(): void {
    const token = localStorage.getItem('access_token') || '';
    this.userService.getUserProfile(token).subscribe({
      next: (user: User) => {
        this.userProfile = user;
        this.userProfileImage = this.getProfileImgUrl(user);
        localStorage.setItem('userProfile', JSON.stringify(user));
        this.userProfileSubject.next(user);
        console.log('Perfil del usuario:', user);
      },
      error: (error) => {
        console.error('Error al cargar el perfil del usuario', error);
      },
    });
  }

  getProfileImgUrl(user: User): string {
    const baseUrl = 'http://127.0.0.1:8000/';
    const defaultImage = 'usuario.png';
    return user.profile_img ? `${baseUrl}${user.profile_img}` : defaultImage;
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

  getUserProfileUpdates() {
    return this.userProfileSubject.asObservable();
  }
}
