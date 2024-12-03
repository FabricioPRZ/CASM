import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { PublicationCardComponent } from '../../components/publication-card/publication-card.component';
import { PublicationService } from '../../services/publication.service';
import { Publication } from '../../models/publication';
import { NoteCardComponent } from '../../components/note-card/note-card.component';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { Note } from '../../models/note';
import { FormsModule } from '@angular/forms';
import { FooterMenuComponent } from "../../components/footer-menu/footer-menu.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [SidebarComponent, PublicationCardComponent, CommonModule, NoteCardComponent, HeaderComponent, FormsModule, FooterMenuComponent],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  publications: Publication[] = [];
  notes: Note[] = [];
  isSidebarVisible: boolean = true;
  isMobileView: boolean = false;
  isModalOpen: boolean = false;

  publicationDescription: string = '';
  selectedFile: File | undefined = undefined;

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
    this.publicationService.getPublications().subscribe(
      (data) => {
        this.publications = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'No se pudieron cargar las publicaciones',
          text: 'Inténtealo de nuevo más tarde.',
          confirmButtonText: 'Aceptar',
        });
      }
    );
  }

  openPublicationDialog(): void {
    this.isModalOpen = true;
  }

  closePublicationDialog(): void {
    this.isModalOpen = false;
    this.publicationDescription = '';
    this.selectedFile = undefined;
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  createPublication(): void {
    if (!this.publicationDescription) {
      Swal.fire({
        icon: 'warning',
        title: 'Descripción obligatoria',
        text: 'Por favor, ingresa una descripción para la publicación.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    console.log('Description:', this.publicationDescription);
    console.log('Selected File:', this.selectedFile);

    this.publicationService.createPublication(this.publicationDescription, this.selectedFile)
      .subscribe(
        (newPublication) => {
          this.publications.unshift(newPublication);
          this.closePublicationDialog();

          Swal.fire({
            icon: 'success',
            title: 'Publicación creada',
            text: 'La publicación fue creada con éxito.',
            confirmButtonText: 'Aceptar',
          });
        },
        (error) => {
          console.error('Error creating publication:', error);

          Swal.fire({
            icon: 'error',
            title: 'Error al crear la publicación',
            text: 'Hubo un problema al crear la publicación. Inténtalo de nuevo.',
            confirmButtonText: 'Aceptar',
          });
        }
      );
  }

  deletePublication(id_publication: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.publicationService.deletePublication(id_publication).subscribe(
          () => {
            this.publications = this.publications.filter(p => p.id_publication !== id_publication);

            Swal.fire({
              icon: 'success',
              title: 'Publicación eliminada',
              text: 'La publicación fue eliminada con éxito.',
              confirmButtonText: 'Aceptar',
            });
          },
          (error) => {
            console.error('Error deleting publication:', error);

            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar la publicación',
              text: 'Hubo un problema al eliminar la publicación. Inténtalo más tarde.',
              confirmButtonText: 'Aceptar',
            });
          }
        );
      }
    });
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

  getFullImageUrl(relativePath: string | null, defaultImage: string): string {
    const baseUrl = 'https://casmback.integrador.xyz/uploads/';
    if (relativePath) {
      return `${baseUrl}${relativePath.replace('\\', '/')}`;
    }
    return `${baseUrl}${defaultImage}`;
  }
}
