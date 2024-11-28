import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PublicationService } from '../../services/publication.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-publication-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './publication-dialog.component.html',
  styleUrls: ['./publication-dialog.component.scss']
})
export class PublicationDialogComponent implements OnInit {
  description: string = '';
  selectedFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<PublicationDialogComponent>,
    private publicationService: PublicationService
  ) {}

  ngOnInit(): void {}

  // Manejo del archivo seleccionado
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  // Manejo del formulario cuando se envía
  // En el método onSubmit
onSubmit(event: Event): void {
  if (!this.description || !this.selectedFile) {
    Swal.fire('Error', 'Por favor, proporciona una descripción y una imagen.', 'error');
    return;
  }

  const formData = new FormData();
  formData.append('description', this.description);
  formData.append('image', this.selectedFile, this.selectedFile.name);

  // Verificar el contenido de FormData antes de enviarlo
  console.log('Form data being sent:', formData);

  // Si los datos son correctos, el FormData debe contener 'description' y 'image'
  this.publicationService.createPublication(formData).subscribe(
    () => {
      Swal.fire('Éxito', 'La publicación se ha creado correctamente', 'success');
      this.dialogRef.close();
    },
    (error) => {
      Swal.fire('Error', 'No se pudo crear la publicación', 'error');
      console.error('Error:', error);
    }
  );
}

  
  // Cancelar la acción
  onCancel(): void {
    this.dialogRef.close();
  }
}
