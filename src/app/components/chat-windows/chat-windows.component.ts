import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { ChatBotService } from '../../services/chat-bot.service';

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
    id: '',
    name: '',
    last_name: '',
    email: '',
    password: '',
    speciality: '',
    phone: '',
    role: 'user',
    document: '',
    profile_img: '',
    id_referency: '',
    premium: false,
  };

  messages = [
    { text: 'Hola', sender: { id: '' } },
    { text: '¿Cómo estás?', sender: { id: '' } }
  ];

  newMessage: string = '';

  constructor(private chatBotService: ChatBotService) {}

  sendMessage() {
    if (this.newMessage.trim()) {
      // Aseguramos que el id del sender es un string
      const senderId = this.currentUser.id || ''; // Usa un ID vacío si currentUser.id es undefined
  
      // Agrega el mensaje del usuario
      this.messages.push({
        text: this.newMessage,
        sender: { id: senderId } // Asigna el sender con un ID string
      });
  
      // Llama al chatbot para la respuesta
      this.chatBotService.sendMessage(this.newMessage).subscribe({
        next: (response) => {
          // Aquí manejamos la respuesta de la API de Gemini
          const botReply = response?.contents[0]?.parts[0]?.text || 'No tengo una respuesta en este momento.';
          this.messages.push({
            text: botReply,
            sender: { id: '' } // ID 0 representa al chatbot
          });
        },
        error: () => {
          // Si hay un error en la llamada a la API, agregamos un mensaje de error
          this.messages.push({
            text: 'Hubo un error al procesar tu solicitud.',
            sender: { id: '' }
          });
        }
      });
  
      this.newMessage = ''; // Limpiar el campo de mensaje después de enviarlo
    }
  }  
}
