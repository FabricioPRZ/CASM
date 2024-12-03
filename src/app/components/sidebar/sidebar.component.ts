import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChatbotApiService } from '../../services/chatbot-api.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor (private router: Router){}

  geminiService = inject(ChatbotApiService);
  chatbotResponses : string[] = [];
  isChatOpen: boolean = false;

  async getAnswer() {
    const userInput = this.geminiService.form.get('userInput')?.value;
    if (userInput) {
      this.chatbotResponses.push(`Tú: ${userInput}`);
      const response = await this.geminiService.generate(userInput);
      let cleanResponse = response.replace(/\*/g, '');
      this.chatbotResponses.push(`CASM: ${cleanResponse}`);
      this.geminiService.form.reset();
    }
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  closeChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  redirect_to_favorites (event: Event){
    event.preventDefault();
    this.router.navigate(["/favorites"])
  }
  redirect_to_feed (event: Event){
    event.preventDefault();
    this.router.navigate(["/feed"])
  }
  redirect_to_chat (event: Event){
    event.preventDefault();
    this.router.navigate(["/chat"])
  }
  redirect_to_notes (event: Event){
    event.preventDefault();
    this.router.navigate(["/notes"])
  }
}
