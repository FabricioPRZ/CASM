import { Component, HostListener } from '@angular/core';
import { NoteCardComponent } from '../../components/note-card/note-card.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { Note } from '../../models/note';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { NotesService } from '../../services/notes.service';
import { FormsModule } from '@angular/forms';
import { FooterMenuComponent } from "../../components/footer-menu/footer-menu.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [NoteCardComponent, SidebarComponent, CommonModule, HeaderComponent, FormsModule, FooterMenuComponent],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent {
  notes: Note[] = [];
  isSidebarVisible: boolean = true;
  isMobileView: boolean = false;
  isModalOpen: boolean = false;

  newNoteTitle: string = '';
  newNoteDescription: string = '';

  constructor(private dialog: MatDialog, private router: Router, private notesService: NotesService) {}

  ngOnInit(): void {
    this.loadNotes();
    this.checkScreenSize();
  }

  loadNotes(): void {
    this.notesService.getNotes().subscribe({
      next: (fetchedNotes) => {
        this.notes = fetchedNotes;
        if (this.notes.length === 0) {
          Swal.fire({
            icon: 'info',
            title: 'No hay notas',
            text: 'No tienes notas en tu perfil.',
            confirmButtonText: 'Aceptar',
          });
        }
      },
      error: (err) => {
        console.error('Error al cargar las notas:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar notas',
          text: 'Hubo un problema al cargar las notas. Por favor, inténtalo de nuevo.',
          confirmButtonText: 'Aceptar',
        });
      },
    });
  }

  openNoteDialog(): void {
    this.isModalOpen = true;
  }

  closeNoteDialog(): void {
    this.isModalOpen = false;
    this.clearNoteInputs();
  }

  clearNoteInputs(): void {
    this.newNoteTitle = '';
    this.newNoteDescription = '';
  }

  saveNote(): void {
    if (!this.newNoteTitle || !this.newNoteDescription) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos antes de guardar la nota.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    const newNote = {
      title: this.newNoteTitle,
      description: this.newNoteDescription,
    };

    this.notesService.createNote(newNote).subscribe({
      next: (createdNote) => {
        this.notes.push(createdNote);
        Swal.fire({
          icon: 'success',
          title: '¡Nota guardada con éxito!',
          text: 'Tu nueva nota ha sido guardada correctamente.',
          confirmButtonText: 'Aceptar',
        });
        this.closeNoteDialog();
      },
      error: (err) => {
        console.error('Error al guardar la nota:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar la nota',
          text: 'Hubo un problema al guardar la nota. Intenta de nuevo más tarde.',
          confirmButtonText: 'Aceptar',
        });
      },
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isMobileView = window.innerWidth <= 768;
    this.isSidebarVisible = !this.isMobileView;
  }

  redirect_to_favorites(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/favorites']);
  }

  redirect_to_feed(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/feed']);
  }

  redirect_to_chat(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/chat']);
  }

  redirect_to_notes(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/notes']);
  }
}
