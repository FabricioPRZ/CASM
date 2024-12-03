import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss'],
})
export class FavoriteCardComponent {
  @Input() type!: string;
  @Input() itemData!: any;
  @Output() onFavoriteRemoved: EventEmitter<string> = new EventEmitter<string>();
  isFavorite: boolean = true;

  constructor(private favoritesService: FavoritesService) {}

  toggleFavorite(): void {
    this.isFavorite = false;
    this.onFavoriteRemoved.emit(this.itemData.id);
  }

  formatImageUrl(imagePath: string | null): string {
    const baseUrl = 'https://casmback.integrador.xyz/';
    if (imagePath && !imagePath.startsWith('http')) {
      return `${baseUrl}${imagePath.replace(/\\/g, '/')}`;
    }
    return imagePath || 'assets/images/default-image.jpg';
  }
}
