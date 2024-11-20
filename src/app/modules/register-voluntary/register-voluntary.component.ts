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
  psychologist: User = {
    id: 0,
    name: "",
    email: "",
    password: "",
    specialty: "",
    phone: "",
    role: "voluntary",  // Asegurarse de que se registre como voluntario (psicólogo)
    profileImage: "",
    isPremium: false
  };
  
  notificationMessage: string = '';
  showNotification: boolean = false;
  notificationType: string = ''; // 'success' o 'error'

  constructor(private router: Router, private userService: UserService) {}

  // Función para registrar al psicólogo (voluntario)
  registerPsychologist() {
    this.userService.registerUser(this.psychologist).subscribe({
      next: (response) => {
        this.notificationMessage = '¡Voluntario registrado con éxito!';
        this.notificationType = 'success';  // Notificación exitosa
        this.showNotification = true;
        this.clearForm(); // Limpiar el formulario de entrada

        // Redirigir al login después de 3 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        this.notificationMessage = 'Error en el registro. Inténtalo de nuevo.';
        this.notificationType = 'error';  // Notificación de error
        this.showNotification = true;
      }
    });
  }

  // Función para limpiar el formulario después del registro
  clearForm() {
    this.psychologist = {
      id: 0,
      name: "",
      email: "",
      password: "",
      specialty: "",
      phone: "",
      role: "voluntary", // Voluntario (psicólogo)
      profileImage: "",
      isPremium: false,
    };
  }

  // Función para redirigir al login
  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
