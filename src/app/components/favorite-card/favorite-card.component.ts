import { Component, Input } from '@angular/core';
import { PublicationCardComponent } from '../publication-card/publication-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite-card',
  standalone: true,
  imports: [PublicationCardComponent, CommonModule],
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss']
})
export class FavoriteCardComponent {
  @Input() type!: string; 
  @Input() itemData!: any;

  sendMessage(id: string) {
    console.log(`Enviar mensaje a: ${id}`);
  }
}