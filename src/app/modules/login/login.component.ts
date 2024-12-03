import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule],
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

  loginUser(event: Event): void {
    event.preventDefault();
    const email = this.inputEmail.value.trim();
    const password = this.inputPassword.value.trim();

    if (!email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos obligatorios',
        text: 'Por favor, completa todos los campos.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    const loginData = { email, password };

    this.userService.loginUser(loginData).subscribe({
      next: (response) => {
        if (response && response.access_token) {
          console.log('Token recibido:', response.access_token);

          localStorage.setItem('access_token', response.access_token);

          Swal.fire({
            icon: 'success',
            title: '¡Inicio de sesión exitoso!',
            text: 'Bienvenido al feed.',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            this.authService.setLoggedIn(true);

            this.router.navigate(['/feed']);
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error en la autenticación',
            text: 'No se pudo iniciar sesión. Inténtalo de nuevo.',
            confirmButtonText: 'Aceptar',
          });
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error en el servidor',
          text: 'Hubo un problema al iniciar sesión. Inténtalo más tarde.',
          confirmButtonText: 'Aceptar',
        });
        console.error('Error en el inicio de sesión:', err);
      },
    });
  }

  redirect_to_register(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/register']);
  }

  redirect_to_register_voluntary(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/register-voluntary']);
  }
}
