import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { PublicationCardComponent } from '../../components/publication-card/publication-card.component';
import { PublicationService } from '../../services/publication.service';
import { Publication } from '../../models/publication';
import { PublicationDialogComponent } from '../../components/publication-dialog/publication-dialog.component';
import { NoteCardComponent } from '../../components/note-card/note-card.component';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [SidebarComponent, PublicationCardComponent, CommonModule, NoteCardComponent, HeaderComponent],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  publications: Publication[] = [];
  notes: { title: string; content: string }[] = [
    { title: 'Nota 1', content: 'Contenido de la nota 1' },
    { title: 'Nota 2', content: 'Contenido de la nota 2' }
  ];
  isSidebarVisible: boolean = true;
  isMobileView: boolean = false;

  constructor(private publicationService: PublicationService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.loadPublications();
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isMobileView = window.innerWidth <= 768;
    this.isSidebarVisible = !this.isMobileView;
  }

  loadPublications(): void {
    this.publicationService.getPublications().subscribe((data: Publication[]) => {
      this.publications = data;
    });
  }

  openPublicationDialog(): void {
    const dialogRef = this.dialog.open(PublicationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPublications();
      }
    });
  }

  onShare(note: { title: string; content: string }): void {
    const newPublication: Publication = {
      id: 0,
      user_id: 1,
      user_name: 'nombre de usuario',
      description: note.content,
      image: ''
    };

    this.publicationService.createPublication(newPublication).subscribe({
      next: () => this.loadPublications(),
      error: (err) => console.error('Error al compartir la nota en el feed', err),
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
}
