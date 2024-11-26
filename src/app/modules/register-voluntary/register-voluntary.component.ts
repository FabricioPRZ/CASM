import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NotificationComponent } from '../../components/notification/notification.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-voluntary',
  standalone: true,
  templateUrl: './register-voluntary.component.html',
  styleUrls: ['./register-voluntary.component.scss'],
  imports: [HeaderComponent, FooterComponent, NotificationComponent, CommonModule, FormsModule]
})
export class RegisterVoluntaryComponent implements OnInit {
  // Campos del formulario
  inputName!: HTMLInputElement;
  inputLastName!: HTMLInputElement;
  inputSpeciality!: HTMLInputElement;
  inputPhone!: HTMLInputElement;
  inputEmail!: HTMLInputElement;
  inputPassword!: HTMLInputElement;
  inputDocument!: HTMLInputElement;

  notificationMessage: string = '';
  showNotification: boolean = false;
  notificationType: string = '';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    // Inicialización de los campos
    this.inputName = document.getElementById('name') as HTMLInputElement;
    this.inputLastName = document.getElementById('last_name') as HTMLInputElement;
    this.inputSpeciality = document.getElementById('speciality') as HTMLInputElement;
    this.inputPhone = document.getElementById('phone') as HTMLInputElement;
    this.inputEmail = document.getElementById('email') as HTMLInputElement;
    this.inputPassword = document.getElementById('password') as HTMLInputElement;
    this.inputDocument = document.getElementById('file-upload') as HTMLInputElement;
  }

  // Función para registrar al voluntario
  registerVoluntary(event: Event): void {
    event.preventDefault();

    // Obtenemos los valores de los campos
    const name = this.inputName.value.trim();
    const lastName = this.inputLastName.value.trim();
    const speciality = this.inputSpeciality.value.trim();
    const phone = this.inputPhone.value.trim() || ''; // Enviar cadena vacía si no se usa
    const email = this.inputEmail.value.trim();
    const password = this.inputPassword.value.trim();
    const fileInput = this.inputDocument;

    // Validación de campos obligatorios
    if (!name || !email || !password) {
      this.notificationMessage = 'Por favor, completa todos los campos obligatorios.';
      this.notificationType = 'error';
      this.showNotification = true;
      return;
    }

    // Verificar archivo cargado
    if (!fileInput?.files?.length) {
      this.notificationMessage = 'Por favor, carga el documento de validación.';
      this.notificationType = 'error';
      this.showNotification = true;
      return;
    }

    const file = fileInput.files[0];
    // Depuración: ver qué datos se están enviando
  console.log('Datos a enviar:', {
    name, lastName, speciality, phone, email, password, file
  });

    // Crear el objeto FormData
    const formData = new FormData();
    formData.append('name', name);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('speciality', speciality);
    formData.append('phone', phone); // Enviar cadena vacía si está vacío
    formData.append('role', 'voluntary'); // Rol específico
    formData.append('document', file); // Archivo sin codificar en base64

    // Llamar al servicio para registrar al voluntario
    this.userService.registerUser(formData).subscribe(
      () => {
        this.showNotification = true;
        this.notificationType = 'success';
        this.notificationMessage = 'Usuario creado con éxito';
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error('Error en la solicitud:', error);
        this.notificationMessage = 'Error al crear el usuario: ' + (error.error?.message || 'Inténtalo nuevamente.');
        this.notificationType = 'error';
        this.showNotification = true;
      }
    );
  }

  // Función para redirigir al login
  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
