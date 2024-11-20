import { Component, HostListener } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { NoteCardComponent } from '../../components/note-card/note-card.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NoteDialogComponent } from '../../components/note-dialog/note-dialog.component';
import { Note } from '../../models/note';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [FooterComponent, NoteCardComponent, SidebarComponent, CommonModule, HeaderComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {
  notes: Note[] = [];

  isSidebarVisible: boolean = true;
  isMobileView: boolean = false;
  
  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.loadNotes();
    this.checkScreenSize();
  }

  loadNotes(): void {
    this.notes = [
      { title: 'Nota 1', content: 'Contenido de la nota 1' },
      { title: 'Nota 2', content: 'Contenido de la nota 2' },
      { title: 'Nota 3', content: 'Contenido de la nota 3' }
    ];
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
    const dialogRef = this.dialog.open(NoteDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notes.push(result);
      }
    });
  }
}
