import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NotificationComponent } from '../../components/notification/notification.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, NotificationComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  notificationMessage: string = '';
  showNotification: boolean = false;
  notificationType:  string = '';

  constructor(private router: Router, private userService: UserService) {}

  // Función para manejar el inicio de sesión
  loginUser() {
    const loginData = { email: this.email, password: this.password };

    this.userService.loginUser(loginData).subscribe({
      next: (response) => {
        // Guardar el token recibido en el almacenamiento local
        localStorage.setItem('access_token', response.access_token);
        this.router.navigate(['/feed']);
      },
      error: (err) => {
        // Manejo de errores
        this.notificationMessage = 'Error en el inicio de sesión. Inténtalo de nuevo.';
        this.showNotification = true;
      }
    });
  }

  redirect_to_register(event: Event) {
    event.preventDefault();
    this.router.navigate(["/register"]);
  }

  redirect_to_register_voluntary(event: Event) {
    event.preventDefault();
    this.router.navigate(["/register-voluntary"]);
  }
}
