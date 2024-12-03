import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publication-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './publication-card.component.html',
  styleUrls: ['./publication-card.component.scss'],
})
export class PublicationCardComponent implements OnInit {
  @Input() photo_profile!: string;
  @Input() user_name!: string;
  @Input() description!: string;
  @Input() image!: string | null;
  @Input() id_publication!: string;
  @Output() favoriteCreated = new EventEmitter<{ id: string; type: string; itemData: any }>();

  profileImageUrl: string = '';
  publicationImageUrl: string = '';

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.profileImageUrl = this.getFullImageUrl(this.photo_profile || '', 'usuario.png');
    this.publicationImageUrl = this.getFullImageUrl(this.image, 'imagen_por_defecto.png');
  }

  getFullImageUrl(relativePath: string | null, defaultImage: string): string {
    const baseUrl = 'http://127.0.0.1:8000/uploads/';
    if (relativePath && !relativePath.startsWith('http')) {
      return `${baseUrl}${relativePath.replace('\\', '/')}`;
    }
    return relativePath || `${baseUrl}${defaultImage}`;
  }

  createFavorite(): void {
    const favoriteData = { id_publication: this.id_publication };
    this.favoritesService.createFavorite(favoriteData).subscribe(
      (response) => {
        console.log('Favorito creado:', response);
        const newItemData = {
          description: this.description,
          image: this.image,
          id: response.id, // Incluye el ID generado
        };
        this.favoriteCreated.emit({ id: response.id, type: 'publication', itemData: newItemData });
      },
      (error) => console.error('Error al crear favorito:', error)
    );
  }
}
