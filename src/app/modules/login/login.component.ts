import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NotificationComponent } from '../../components/notification/notification.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NotificationComponent, HeaderComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  inputEmail!: HTMLInputElement;
  inputPassword!: HTMLInputElement;

  constructor(private router: Router, private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.inputEmail = document.getElementById('email') as HTMLInputElement;
    this.inputPassword = document.getElementById('password') as HTMLInputElement;
  }

  notificationMessage: string = '';
  showNotification: boolean = false;
  notificationType: string = '';

  // Función para manejar el inicio de sesión
  loginUser(event: Event): void {
    event.preventDefault();
    const email = this.inputEmail.value.trim();
    const password = this.inputPassword.value.trim();
  
    const loginData = { email, password };
  
    this.userService.loginUser(loginData).subscribe({
      next: (response) => {
        if (response && response.access_token) {
          // Verificar que el token esté presente en la respuesta
          console.log('Token recibido:', response.access_token);
  
          // Guardar el token en el localStorage
          localStorage.setItem('access_token', response.access_token);
          
          // Verificar que el token esté guardado en el localStorage
          const storedToken = localStorage.getItem('access_token');
          console.log('Token guardado en localStorage:', storedToken);
  
          // Actualizar el estado de autenticación
          this.authService.setLoggedIn(true);
          
          // Redirigir al feed
          this.router.navigate(['/feed']);
        } else {
          console.error('Token no recibido');
        }
      },
      error: (err) => {
        console.error('Error en el inicio de sesión', err);
      }
    });
  }
  
  

  redirect_to_register(event: Event) {
    event.preventDefault();
    this.router.navigate(['/register']);
  }

  redirect_to_register_voluntary(event: Event) {
    event.preventDefault();
    this.router.navigate(['/register-voluntary']);
  }
}
