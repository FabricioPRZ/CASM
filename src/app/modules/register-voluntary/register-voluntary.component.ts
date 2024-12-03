import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-voluntary',
  standalone: true,
  templateUrl: './register-voluntary.component.html',
  styleUrls: ['./register-voluntary.component.scss'],
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule]
})
export class RegisterVoluntaryComponent implements OnInit {
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
    this.inputDocument = document.getElementById('file-upload') as HTMLInputElement;
  }

  registerVoluntary(event: Event): void {
    event.preventDefault();

    const name = this.inputName.value.trim();
    const lastName = this.inputLastName.value.trim();
    const speciality = this.inputSpeciality.value.trim();
    const phone = this.inputPhone.value.trim() || '';
    const email = this.inputEmail.value.trim();
    const password = this.inputPassword.value.trim();
    const fileInput = this.inputDocument;

    if (!name || !lastName || !speciality || !email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, complete todos los campos obligatorios.',
      });
      return;
    }

    if (!fileInput?.files?.length) {
      Swal.fire({
        icon: 'warning',
        title: 'Documento requerido',
        text: 'Por favor, suba el documento necesario para completar el registro.',
      });
      return;
    }

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('name', name);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('speciality', speciality);
    formData.append('phone', phone);
    formData.append('role_name', 'voluntary');
    formData.append('document', file);

    this.userService.registerUser(formData).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'El voluntario se ha registrado correctamente. Ahora puedes iniciar sesión.',
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      (error: any) => {
        console.error('Error en la solicitud:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: 'Hubo un error al intentar registrar al voluntario. Intenta nuevamente.',
        });
      }
    );
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
