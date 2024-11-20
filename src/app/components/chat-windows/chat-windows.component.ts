import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-chat-windows',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-windows.component.html',
  styleUrls: ['./chat-windows.component.scss']
})
export class ChatWindowsComponent {
  @Input() chat: any;
  @Input() currentUser: User = {
    id: 0,
    name: 'Juan',
    email: '',
    password: '',
    specialty: '',
    phone: '',
    role: '',
    profileImage: '',
    isPremium: false
  };

  messages = [
    { text: 'Hola', sender: { id: 1 } },
    { text: '¿Cómo estás?', sender: { id: 2 } }
  ];

  newMessage: string = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({
        text: this.newMessage,
        sender: this.currentUser
      });
      this.newMessage = '';
    }
  }
}
