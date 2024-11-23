import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
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
export class RegisterVoluntaryComponent {

  inputName!: HTMLInputElement;
  inputLastName!: HTMLInputElement;
  inputSpeciality!: HTMLInputElement;
  inputPhone!: HTMLInputElement;
  inputEmail!: HTMLInputElement;
  inputPassword!: HTMLInputElement;
  inputDocument!: HTMLInputElement;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.inputName = document.getElementById('name') as HTMLInputElement;
    this.inputLastName = document.getElementById('last_name') as HTMLInputElement;
    this.inputSpeciality = document.getElementById('speciality') as HTMLInputElement;
    this.inputPhone = document.getElementById('phone') as HTMLInputElement;
    this.inputEmail = document.getElementById('email') as HTMLInputElement;
    this.inputPassword = document.getElementById('password') as HTMLInputElement;
    this.inputDocument = document.getElementById('document') as HTMLInputElement;
  }
  
  notificationMessage: string = '';
  showNotification: boolean = false;
  notificationType: string = '';


  // Función para registrar al psicólogo (voluntario)
  registerPsychologist(event : Event): void {
    event.preventDefault();
    const name = this.inputName.value;
    const last_name = this.inputLastName.value;
    const speciality = this.inputSpeciality.value;
    const phone = this.inputPhone.value;
    const email = this.inputEmail.value;
    const password = this.inputPassword.value;
    const document = this.inputDocument.value;

    // Crear un nuevo objeto FormData
    const formData = new FormData();
    formData.append('name', name);
    formData.append('last_name', last_name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('speciality', speciality);
    formData.append('phone', phone);
    formData.append('document', document);
    formData.append('role', 'voluntary');

    this.userService.registerUser(formData).subscribe({
      next: (response) => {
        this.notificationMessage = '¡Voluntario registrado con éxito!';
        this.notificationType = 'success';
        this.showNotification = true;

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        this.notificationMessage = 'Error en el registro. Inténtalo de nuevo.';
        this.notificationType = 'error';
        this.showNotification = true;
      }
    });
  }

  // Función para redirigir al login
  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
