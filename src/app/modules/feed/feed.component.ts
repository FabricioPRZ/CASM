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
import { Note } from '../../models/note';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [SidebarComponent, PublicationCardComponent, CommonModule, NoteCardComponent, HeaderComponent],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  publications: Publication[] = [
    {
      id: '1',
      user_id: '5',
      description: 'Hola, esto es una prueba',
      image: 'thanks.png',
    },
  ];
  notes: Note[] = [];
  isSidebarVisible: boolean = true;
  isMobileView: boolean = false;
  isModalOpen : boolean = false;

  constructor(
    private publicationService: PublicationService,
    private dialog: MatDialog,
    private router: Router
  ) {}

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
    const token = localStorage.getItem('access_token'); // Obtener el token

    /*if (token) {
      // Pasar el token a la función de servicio
      this.publicationService.getPublications().subscribe({
        next: (data: Publication[]) => {
          this.publications = data;
        },
        error: (err) => {
          console.error('Error al cargar publicaciones:', err);
          if (err.status === 401) {
            this.router.navigate(['/login']);
          }
        },
      });
    } else {
      console.error('No se encontró el token, redirigiendo al login');
      this.router.navigate(['/login']);
    }*/
  }

  openPublicationDialog(): void {
    this.isModalOpen = true;
  }

  closePublicationDialog(): void {
    this.isModalOpen = false;
  }

  onShare(note: { title: string; content: string }): void {
    // Crear un objeto FormData para compartir una nota como publicación
    const formData = new FormData();
    formData.append('description', note.content);
    // La imagen puede ser opcional
    formData.append('image', '');

    this.publicationService.createPublication(formData).subscribe({
      next: () => this.loadPublications(),
      error: (err) => console.error('Error al compartir la nota en el feed:', err),
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
