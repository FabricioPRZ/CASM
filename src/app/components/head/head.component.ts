import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-head',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
})
export class HeadComponent implements OnInit {
  userProfile: User = {} as User;
  roleName: string = '';
  isModalOpen: boolean = false;
  profileForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      last_name: [''],
      email: ['', [Validators.required, Validators.email]],
      speciality: [''],
      phone: [''],
      address: [''],
      profile_img: [null],
      cedula: [null],
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const token = localStorage.getItem('access_token') || '';
    this.userService.getUserProfile(token).subscribe({
      next: (user: User) => {
        this.userProfile = user;
        this.roleName = user.role_name;
        this.populateForm(user);
      },
    });
  }

  getProfileImgUrl(): string {
    const baseUrl = 'http://127.0.0.1:8000/';
    const defaultImage = 'usuario.png';
    return this.userProfile.profile_img ? `${baseUrl}${this.userProfile.profile_img}` : defaultImage;
  }

  populateForm(user: User): void {
    this.profileForm.patchValue({
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      speciality: user.speciality,
      phone: user.phone,
      address: user.address,
      profile_img: user.profile_img,
      cedula: user.cedula,
    });
  }

  openEditDialog(): void {
    this.isModalOpen = true;
  }

  closeEditDialog(): void {
    this.isModalOpen = false;
  }

  handleFileInput(event: Event, type: 'profile_img' | 'cedula'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.profileForm.patchValue({ [type]: file });
    }
  }

  updateProfile(): void {
    const formData = new FormData();
  
    Object.keys(this.profileForm.controls).forEach((key) => {
      const value = this.profileForm.get(key)?.value;
  
      if (value) {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value.toString());
        }
      }
    });
  
    this.userService.updateUserProfile(formData).subscribe({
      next: (updatedUser) => {
        this.userProfile = updatedUser;
        this.isModalOpen = false;

        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Perfil actualizado con éxito',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: (error) => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Hubo un problema al actualizar el perfil',
          showConfirmButton: false,
          timer: 1500
        });
      },
    });
  }

  deleteProfile(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Esta acción eliminará permanentemente tu perfil!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUserProfile().subscribe({
          next: () => {
            localStorage.clear();
            this.router.navigate(['/login']);

            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'Perfil eliminado',
              showConfirmButton: false,
              timer: 1500
            });
          },
          error: (error) => {
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'error',
              title: 'Hubo un problema al eliminar el perfil',
              showConfirmButton: false,
              timer: 1500
            });
          },
        });
      }
    });
  }
}
