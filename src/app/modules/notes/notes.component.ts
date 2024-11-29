import { Component, HostListener } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { NoteCardComponent } from '../../components/note-card/note-card.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { Note } from '../../models/note';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [FooterComponent, NoteCardComponent, SidebarComponent, CommonModule, HeaderComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {
  notes: Note[] = [
      {
        id: '1',
        title: 'Hola',
        description: 'Soy una nota de prueba',
      },
  ];
  isSidebarVisible: boolean = true;
  isMobileView: boolean = false;
  isModalOpen : boolean = false;
  
  constructor(private dialog: MatDialog, private router: Router, private notesService: NotesService) {}

  ngOnInit(): void {
    this.loadNotes();
    this.checkScreenSize();
  }

  loadNotes(): void {
    this.notesService.getNotes().subscribe({
      next: (fetchedNotes) => {
        this.notes = fetchedNotes;
      },
      error: (err) => {
        console.error('Error al cargar las notas:', err);
      },
    });
  }

  redirect_to_favorites(event: Event): void {
    event.preventDefault();
    this.router.navigate(["/favorites"]);
  }

  redirect_to_feed(event: Event): void {
    event.preventDefault();
    this.router.navigate(["/feed"]);
  }

  redirect_to_chat(event: Event): void {
    event.preventDefault();
    this.router.navigate(["/chat"]);
  }

  redirect_to_notes(event: Event): void {
    event.preventDefault();
    this.router.navigate(["/notes"]);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isMobileView = window.innerWidth <= 768;
    this.isSidebarVisible = !this.isMobileView;
  }

  openNoteDialog(): void {
    this.isModalOpen = true;
  }

  closeNoteDialog(): void {
    this.isModalOpen = false;
  }
}
