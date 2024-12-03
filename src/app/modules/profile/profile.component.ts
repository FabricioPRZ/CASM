import { Component, OnInit, HostListener } from '@angular/core';
import { HeadComponent } from "../../components/head/head.component";
import { PublicationCardComponent } from '../../components/publication-card/publication-card.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { PublicationService } from '../../services/publication.service';
import { Publication } from '../../models/publication';
import { FooterMenuComponent } from "../../components/footer-menu/footer-menu.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [PublicationCardComponent, SidebarComponent, HeadComponent, CommonModule, HeaderComponent, FooterMenuComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  publications: Publication[] = [];

  isSidebarVisible: boolean = true;
  isMobileView: boolean = false;

  constructor(private router: Router, private publicationService: PublicationService) {}

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
    this.publicationService.getPublicationsUser().subscribe(
      (data) => {
        this.publications = data;
        if (this.publications.length === 0) {
          Swal.fire({
            icon: 'info',
            title: 'Sin publicaciones',
            text: 'No tienes publicaciones en tu perfil.',
            confirmButtonText: 'Aceptar',
          });
        }
      },
      (error) => {
        console.error('Error loading publications:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar las publicaciones',
          text: 'Hubo un problema al cargar tus publicaciones. Intenta de nuevo más tarde.',
          confirmButtonText: 'Aceptar',
        });
      }
    );
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
