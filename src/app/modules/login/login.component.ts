import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NotificationComponent } from '../../components/notification/notification.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private router: Router, private userService: UserService) {}

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

    const loginData = {
      email: email,
      password: password
    };

    // Llamar al servicio de login pasándole los datos como JSON
    this.userService.loginUser(loginData).subscribe({
      next: (response) => {
        if (response && response.access_token) {
          // Guardar el token en el localStorage
          localStorage.setItem('access_token', response.access_token);
          // Redirigir a la página de feed
          this.router.navigate(['/feed']);
        } else {
          this.notificationMessage = 'Token no recibido. Inténtalo de nuevo.';
          this.notificationType = 'error';
          this.showNotification = true;
        }
      },
      error: (err) => {
        this.notificationMessage = 'Error en el inicio de sesión. Inténtalo de nuevo.';
        this.notificationType = 'error';
        this.showNotification = true;
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
