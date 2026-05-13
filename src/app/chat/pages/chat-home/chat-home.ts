import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from './../../services/chat-service';
import { ChatRequest, ChatResponse } from './../../model/chat.model';

interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
}

@Component({
  selector: 'app-chat-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-home.html',
  styleUrl: './chat-home.scss',
})
export class ChatHome {
  private chatService = inject(ChatService);
  userInput: string = '';
  isLoading: boolean = false;

  messages: ChatMessage[] = [
    {
      role: 'bot',
      content: 'Hello! Welcome to Axions HR Assistant.'
    }
  ];

  sendMessage(): void {

    if (!this.userInput.trim()) {
      return;
    }

    // ADD USER MESSAGE
    this.messages.push({
      role: 'user',
      content: this.userInput
    });

    const payload: ChatRequest = {
      user_input: this.userInput
    };

    // CLEAR INPUT
    this.userInput = '';

    this.isLoading = true;

    // API CALL
    this.chatService.sendMessage(payload)
      .subscribe({

        next: (response) => {

          console.log('API Response:', response);

          this.messages.push({
            role: 'bot',
            content: response.answer
          });

          console.log('messages:', this.messages);

          this.isLoading = false;
        },

        error: (error) => {

          console.error('API Error:', error);

          this.messages.push({
            role: 'bot',
            content: 'Something went wrong.'
          });

          this.isLoading = false;
        }

      });

  }

  /*sendMessage(): void {

    if (!this.userInput.trim()) {
      return;
    }

    // USER MESSAGE
    this.messages.push({
      role: 'user',
      content: this.userInput
    });

    // SAMPLE BOT RESPONSE
    this.messages.push({
      role: 'bot',
      content: 'This is sample AI response.'
    });

    // CLEAR INPUT
    this.userInput = '';
  }*/

}
