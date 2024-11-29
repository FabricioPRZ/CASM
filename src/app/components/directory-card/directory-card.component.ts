import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() messageClicked = new EventEmitter<any>();

  onSendMessage() {
    const user = {
      name: this.user_name,
      email: this.email,
      phone: this.phone_number
    };
    this.messageClicked.emit(user);
  }
}