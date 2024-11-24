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
    const name = this.inputName.value;
    const lastName = this.inputLastName.value;
    const speciality = this.inputSpeciality.value;
    const phone = this.inputPhone.value;
    const email = this.inputEmail.value;
    const password = this.inputPassword.value;
    const fileInput = this.inputDocument;

    // Validación de campos vacíos
    if (!name || !lastName || !speciality || !phone || !email || !password) {
      this.notificationMessage = 'Por favor, completa todos los campos.';
      this.notificationType = 'error';
      this.showNotification = true;
      return;
    }

    // Verificamos si el archivo existe
    if (!fileInput?.files?.length) {
      this.notificationMessage = 'Por favor, carga el documento de validación.';
      this.notificationType = 'error';
      this.showNotification = true;
      return;
    }

    const document = fileInput.files[0]; // Accedemos al archivo cargado

    // Crear un nuevo objeto FormData
    const formData = new FormData();
    formData.append('name', name);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('speciality', speciality);
    formData.append('phone', phone);
    formData.append('document', document); // Aseguramos que el archivo no es undefined
    formData.append('role', 'voluntary'); // Rol específico para voluntarios

    // Llamar al servicio para registrar al voluntario
    this.userService.registerUser(formData).subscribe(
      () => {
        this.showNotification = true;
        this.notificationType = 'success';
        this.notificationMessage = 'Usuario creado con éxito';
        this.router.navigate(['/login']);
      },
      (error: any) => {
        this.notificationMessage = 'Error al crear el usuario';
      }
    );
  }

  // Función para redirigir al login
  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
