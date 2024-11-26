import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule],
})
export class RegisterComponent implements OnInit {
  inputName!: HTMLInputElement;
  inputLastName!: HTMLInputElement;
  inputEmail!: HTMLInputElement;
  inputPassword!: HTMLInputElement;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.inputName = document.getElementById('name') as HTMLInputElement;
    this.inputLastName = document.getElementById('last_name') as HTMLInputElement;
    this.inputEmail = document.getElementById('email') as HTMLInputElement;
    this.inputPassword = document.getElementById('password') as HTMLInputElement;
  }

  validateInputs(): boolean {
    const name = this.inputName.value.trim();
    const last_name = this.inputLastName.value.trim();
    const email = this.inputEmail.value.trim();
    const password = this.inputPassword.value.trim();

    if (!name || !last_name || !email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos obligatorios',
        text: 'Todos los campos deben ser completados.',
        confirmButtonText: 'Aceptar',
      });
      return false;
    }

    if (!this.validateEmail(email)) {
      Swal.fire({
        icon: 'warning',
        title: 'Correo inválido',
        text: 'Por favor, introduce un correo electrónico válido.',
        confirmButtonText: 'Aceptar',
      });
      return false;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: 'warning',
        title: 'Contraseña demasiado corta',
        text: 'La contraseña debe tener al menos 6 caracteres.',
        confirmButtonText: 'Aceptar',
      });
      return false;
    }

    return true;
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  registerUser(event: Event): void {
    event.preventDefault();

    // Validar los campos antes de continuar
    if (!this.validateInputs()) {
      return;
    }

    const name = this.inputName.value;
    const last_name = this.inputLastName.value;
    const email = this.inputEmail.value;
    const password = this.inputPassword.value;

    // Crear un nuevo objeto FormData
    const formData = new FormData();
    formData.append('name', name);
    formData.append('last_name', last_name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', 'user');
    formData.append('premium', 'false');

    // Llamar al servicio para registrar el usuario
    this.userService.registerUser(formData).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: '¡Usuario creado con éxito!',
          text: 'Ahora puedes iniciar sesión.',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo crear el usuario. Por favor, inténtalo de nuevo.',
          confirmButtonText: 'Aceptar',
        });
      }
    );
  }

  redirect_to(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/register-voluntary']);
  }
}
