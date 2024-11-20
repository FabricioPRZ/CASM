import { Component, HostListener } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { FavoriteCardComponent } from '../../components/favorite-card/favorite-card.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [SidebarComponent, FavoriteCardComponent, CommonModule, HeaderComponent],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  favoriteItems = [
    {
      type: 'psychologist',
      itemData: {
        photo_profile: 'psicologo1.png',
        user_name: 'Dr. Ana López',
        description: 'Psicóloga clínica',
        phone: '123-456-7890',
        email: 'ana.lopez@example.com',
        id: '1'
      }
    },
    {
      type: 'psychologist',
      itemData: {
        photo_profile: 'psicologo2.png',
        user_name: 'Dr. Luis Pérez',
        description: 'Psicólogo organizacional',
        phone: '987-654-3210',
        email: 'luis.perez@example.com',
        id: '2'
      }
    }
  ];

  isSidebarVisible: boolean = true;
  isMobileView: boolean = false;

  constructor(private router: Router){}

  ngOnInit(): void{
    this.checkScreenSize();
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
}
