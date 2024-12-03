import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { FavoriteCardComponent } from '../../components/favorite-card/favorite-card.component';
import { FooterMenuComponent } from '../../components/footer-menu/footer-menu.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [SidebarComponent, CommonModule, HeaderComponent, FavoriteCardComponent, FooterMenuComponent],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favoriteItems: any[] = [];
  removedFavorites: any[] = [];
  isSidebarVisible: boolean = true;
  isMobileView: boolean = false;

  constructor(private router: Router, private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.checkScreenSize();
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoritesService.getFavorites().subscribe(
      (favorites) => {
        this.favoriteItems = favorites
          .map((favorite) => {
            if (favorite.publication) {
              return {
                type: 'publication',
                itemData: {
                  description: favorite.publication.description,
                  image: favorite.publication.image,
                  id: favorite.publication.id,
                },
              };
            } else if (favorite.note) {
              return {
                type: 'note',
                itemData: {
                  title: favorite.note.title,
                  content: favorite.note.description,
                  id: favorite.note.id,
                },
              };
            }
            return null;
          })
          .filter((item) => item !== null);
      },
      (error) => Swal.fire({
        icon: 'warning',
        title: 'Favoritos está vacío',
        text: 'Agrega elementos a favoritos para que aparezcan aquí.',
        confirmButtonText: 'Aceptar',
      })
    );
  }

  trackById(index: number, item: any): string {
    return item?.itemData?.id || `${index}`;
  }

  removeFromFavorites(id: string): void {
    const removedItem = this.favoriteItems.find((item) => item.itemData.id === id);

    if (removedItem) {
      this.removedFavorites.push(removedItem);

      this.favoriteItems = this.favoriteItems.filter((item) => item.itemData.id !== id);

      this.favoriteItems = [...this.favoriteItems];

      Swal.fire({
        icon: 'success',
        title: 'Eliminado de Favoritos',
        text: 'El artículo ha sido removido de tus favoritos.',
        confirmButtonText: 'Aceptar',
      });
    }
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
    this.router.navigate(['/favorites']);
  }

  redirect_to_feed(event: Event): void {
    this.router.navigate(['/feed']);
  }

  redirect_to_chat(event: Event): void {
    this.router.navigate(['/chat']);
  }

  redirect_to_notes(event: Event): void {
    this.router.navigate(['/notes']);
  }
}
