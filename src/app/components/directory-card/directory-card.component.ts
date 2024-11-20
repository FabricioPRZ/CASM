import { Component, Input } from '@angular/core';
//casm
@Component({
  selector: 'app-directory-card',
  standalone: true,
  imports: [],
  templateUrl: './directory-card.component.html',
  styleUrl: './directory-card.component.scss'
})
export class DirectoryCardComponent {
  @Input() photo_profile: string = '';
  @Input() user_name: string = '';
  @Input() description: string = '';
  @Input() phone_number: string = '';
  @Input() email: string = '';
}