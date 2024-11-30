import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component';
import { User } from '../../models/user';

@Component({
  selector: 'app-head',
  standalone: true,
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent {
  user: User = {
    id: '',
    name: '',
    last_name: '',
    email: '',
    password: '',
    speciality: '',
    phone: '',
    role_name: 'user',
    cedula: '',
    profile_img: '',
    address: '',
    premium: false,
    is_active: true,
  };

  constructor(private dialog: MatDialog, private userService: UserService) {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.userService.getUserProfile(token).subscribe((userData) => {
        this.user = userData;
      });
    } else {
      // Maneja el caso en el que no se encuentra el token (redirigir al login, etc.)
    }
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '400px',
      data: this.user
    });

    dialogRef.afterClosed().subscribe((updatedData: User) => {
      if (updatedData) {
        const token = localStorage.getItem('access_token');
        if (token) {
          this.userService.updateUserProfile(updatedData, token).subscribe((updatedUser) => {
            this.user = updatedUser;
          });
        } else {
          // Maneja el caso de token no encontrado
        }
      }
    });
  }
}
