import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PublicationService } from '../../services/publication.service';
import { Publication } from '../../models/publication';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-publication-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './publication-dialog.component.html',
  styleUrls: ['./publication-dialog.component.scss']
})
export class PublicationDialogComponent {
  description: string = '';
  selectedFile: File | null = null; // Para manejar el archivo seleccionado

  constructor(
    public dialogRef: MatDialogRef<PublicationDialogComponent>,
    private publicationService: PublicationService
  ) {}

  // Maneja el archivo seleccionado por el usuario
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    // Crear FormData
    const formData = new FormData();
    formData.append('description', this.description);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.publicationService.createPublication(formData).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error al crear la publicación:', err);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
