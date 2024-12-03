import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatbotApiService } from '../../services/chatbot-api.service';

@Component({
  selector: 'app-footer-menu',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './footer-menu.component.html',
  styleUrl: './footer-menu.component.scss'
})
export class FooterMenuComponent {
  geminiService = inject(ChatbotApiService);
  isChatOpen = false;
  isMobileView = false;
  chatbotResponses: string[] = [];

  @Output() redirectToNotes = new EventEmitter<void>();
  @Output() redirectToFavorites = new EventEmitter<void>();
  @Output() redirectToFeed = new EventEmitter<void>();

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  closeChat() {
    this.isChatOpen = false;
  }

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

  redirect_to_notes(event: Event) {
    event.preventDefault();
    this.redirectToNotes.emit();
  }

  redirect_to_favorites(event: Event) {
    event.preventDefault();
    this.redirectToFavorites.emit();
  }

  redirect_to_feed(event: Event) {
    event.preventDefault();
    this.redirectToFeed.emit();
  }
}
