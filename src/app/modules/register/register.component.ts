import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NotificationComponent } from '../../components/notification/notification.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [HeaderComponent, FooterComponent, NotificationComponent, CommonModule, FormsModule],
})
export class RegisterComponent implements OnInit{

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

  notificationMessage: string = '';
  showNotification: boolean = false;
  notificationType: string = '';

  registerUser(event: Event): void {
    event.preventDefault();
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
        this.notificationMessage = 'Usuario creado con éxito';
        this.router.navigate(['/login']);
      },
      (error: any) => {
        this.notificationMessage = 'Error al crear el usuario';
      }
    );
  }
  

  redirect_to(event: Event) {
    event.preventDefault();
    this.router.navigate(['/register-voluntary']);
  }

  showAlert(message: string, type: 'success' | 'error') {
    this.notificationMessage = message;
    this.notificationType = type;
    this.showNotification = true;
  }
}