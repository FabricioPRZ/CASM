import { Component, HostListener } from '@angular/core';
import { DirectoryCardComponent } from '../../components/directory-card/directory-card.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { ChatSiderbarComponent } from '../../components/chat-siderbar/chat-siderbar.component'; // Asegúrate de importar ChatSiderbarComponent

@Component({
  selector: 'app-directory',
  standalone: true,
  imports: [DirectoryCardComponent, SidebarComponent, CommonModule, HeaderComponent, ChatSiderbarComponent],
  templateUrl: './directory.component.html',
  styleUrl: './directory.component.scss'
})
export class DirectoryComponent {

  isSidebarVisible: boolean = true;
  isMobileView: boolean = false;
  chats: any[] = []; // Arreglo para almacenar los chats
  selectedChat: any = null; // Variable para almacenar el chat seleccionado

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  onMessageClicked(user: any): void {
    const newChat = {
      name: user.name,
      email: user.email,
      lastMessage: 'Nuevo Mensaje'
    };
    this.addChat(newChat);
  }

  addChat(chat: any): void {
    // Verifica si ya existe un chat con el mismo correo
    const exists = this.chats.some(existingChat => existingChat.email === chat.email);
    if (!exists) {
      this.chats.push(chat);
    }
    this.selectedChat = chat; // Selecciona el nuevo chat
    this.router.navigate(['/chat'], {
      queryParams: {
        name: chat.name,
        email: chat.email,
        lastMessage: chat.lastMessage
      }
    });
  }

  checkScreenSize(): void {
    this.isMobileView = window.innerWidth <= 768;
    this.isSidebarVisible = !this.isMobileView;
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

  onChatSelected(chat: any): void {
    this.selectedChat = chat; // Actualiza el chat seleccionado
    this.router.navigate(['/chat'], {
      queryParams: {
        name: chat.name,
        email: chat.email,
        lastMessage: chat.lastMessage
      }
    });
  }
}
