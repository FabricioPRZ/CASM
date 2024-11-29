import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-siderbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-siderbar.component.html',
  styleUrls: ['./chat-siderbar.component.scss']
})
export class ChatSiderbarComponent {
  @Input() chats: any[] = [];
  @Output() chatSelected = new EventEmitter<any>();
  @Input() isPremium: boolean = true;

  selectChat(chat: any) {
    this.chatSelected.emit(chat);
  }

  openChatBot() {
    this.chatSelected.emit({ id: 0, name: 'Chat Bot', lastMessage: 'Bienvenido al Chat Bot' });
  }
}
