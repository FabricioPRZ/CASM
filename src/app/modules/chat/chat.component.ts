import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatSiderbarComponent } from "../../components/chat-siderbar/chat-siderbar.component";
import { ChatWindowsComponent } from "../../components/chat-windows/chat-windows.component";
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service'; // Servicio para manejar el usuario
import { User } from '../../models/user';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatSiderbarComponent, ChatWindowsComponent, CommonModule, HeaderComponent],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  selectedChat: any;
  currentUser: User = { 
    id: 0, 
    name: '', 
    email: '', 
    password: '', 
    specialty: '', 
    phone: '', 
    role: '', 
    profileImage: '',
    isPremium: false
  };
  isChatWindowOpen: boolean = false;
  isMobileView: boolean = window.innerWidth <= 768;

  @HostListener('window:resize')
  onResize() {
    this.isMobileView = window.innerWidth <= 768;
    if (!this.isMobileView) {
      this.isChatWindowOpen = true;
    }
  }

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  // Función para cargar los datos del usuario desde el token de autenticación
  loadUserData() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.userService.getUserProfile(token).subscribe({
        next: (user) => {
          this.currentUser = user;
        },
        error: () => {
          this.router.navigate(['/login']); // Redirige a login si no se puede obtener el usuario
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  // Cuando un chat es seleccionado, se abre la ventana del chat
  onChatSelected(chat: any) {
    this.selectedChat = chat;
    this.isChatWindowOpen = true;
  }

  // Cierra la ventana de chat
  closeChatWindow() {
    this.isChatWindowOpen = false;
  }
}
