import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { JwtDecoderService } from '../../services/jwt-decoder.service';

@Component({
  selector: 'app-note-dialog',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule],
  templateUrl: './note-dialog.component.html',
  styleUrl: './note-dialog.component.scss'
})
export class NoteDialogComponent {
  noteTitle: string = '';
  noteContent: string = '';
  userImage: string | null = null;

  constructor(
    private dialogRef: MatDialogRef<NoteDialogComponent>,
    private jwtDecoderService: JwtDecoderService // Inyecta el servicio de decodificación
  ) {}

  saveNote(): void {
    const token = localStorage.getItem('access_token');  // Obtén el token desde el localStorage
    if (!token) {
      console.log('Error: No se encontró el token');
      return;
    }
  
    const decodedToken = this.jwtDecoderService.decodeToken(token);
    const userId = decodedToken?.sub;
  
    if (!userId) {
      console.log('Error: No se encontró el user_id');
      return;
    }
  
    // Verifica si los campos tienen valores antes de cerrar el diálogo
    console.log('Título:', this.noteTitle);  // Verifica que noteTitle no esté vacío
    console.log('Contenido:', this.noteContent);  // Verifica que noteContent tenga el valor esperado
  
    if (!this.noteTitle || !this.noteContent) {
      console.log('Error: Título o contenido vacío');
      return;
    }
  
    this.dialogRef.close({
      user_id: userId,
      title: this.noteTitle,
      description: this.noteContent,  // Verifica que description esté correctamente asignado
      creation_date: new Date().toISOString().split('T')[0],
      modification_date: new Date().toISOString().split('T')[0],
      image: this.userImage
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  // Método para cargar una imagen
  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.userImage = reader.result as string;  // Asegúrate de que userImage tiene un valor válido
      };
      reader.readAsDataURL(file);
    }
  }
  
}
