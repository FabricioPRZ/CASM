import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-profile-dialog',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss']
})
export class EditProfileDialogComponent {
  editProfileForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.editProfileForm = this.fb.group({
      name: [data.name, [Validators.required]],
      email: [data.email, [Validators.required, Validators.email]],
      specialty: [data.specialty],
      phone: [data.phone, [Validators.required]],
      profileImage: [data.profileImage]
    });
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.editProfileForm.patchValue({ profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  async save() {
    if (this.editProfileForm.valid) {
      const formData = this.editProfileForm.value;
      if (formData.profileImage instanceof String) {
        this.dialogRef.close(formData);
      } else {
        const token = localStorage.getItem('access_token');
        if (token) {
          try {
            const imageUrl = await this.uploadProfileImage(formData.profileImage, token);
            formData.profileImage = imageUrl;
            this.dialogRef.close(formData);
          } catch (error) {
            console.error('Error al cargar la imagen:', error);
          }
        } else {
          // Manejo de error si no se encuentra el token
        }
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  async uploadProfileImage(file: string | ArrayBuffer, token: string) {
    const formData = new FormData();
    const blob = this.dataURLtoBlob(file as string);
    formData.append('file', blob, 'profile-image.png');
    try {
      const uploadedImageUrl = await this.userService.uploadProfileImage(formData, token).toPromise();
      return uploadedImageUrl;
    } catch (error) {
      console.error('Error al subir imagen:', error);
      throw error;
    }
  }

  dataURLtoBlob(dataURL: string) {
    const base64Index = dataURL.indexOf('base64,');
    if (base64Index !== -1) {
      dataURL = dataURL.substring(base64Index + 7);
    }
    const byteString = atob(dataURL);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: 'image/png' });
  }

  close() {
    this.dialogRef.close();
  }
}
