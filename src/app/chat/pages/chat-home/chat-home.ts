import { Component, inject, ChangeDetectorRef, signal } from '@angular/core';
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
  styleUrls: ['./chat-home.scss'],
})
export class ChatHome {
  private chatService = inject(ChatService);
  private cdr = inject(ChangeDetectorRef);
  userInput: string = '';
  isLoading: boolean = false;
  isTyping = signal(false);
  isThinking = signal(false);

  messages = signal<ChatMessage[]>([
    {
      role: 'bot',
      content: 'Hello! Welcome to Axions HR Assistant.'
    }
  ]);

  // -----------------------------------
  // USER TYPING
  // -----------------------------------
  onTyping(): void {
    this.isTyping.set(
      this.userInput.trim().length > 0
    );
  }

  sendMessage(): void {

    if (!this.userInput.trim()) {
      return;
    }

    const currentMessage = this.userInput;

    // ADD USER MESSAGE
    this.messages.update(messages => [
      ...messages,
      {
        role: 'user',
        content: this.userInput
      }
    ]);

    // PAYLOAD
    const payload: ChatRequest = {
      user_input: this.userInput
    };

    // CLEAR INPUT
    this.userInput = '';
    this.isLoading = true;

    // RESET TYPING
    this.isTyping.set(false);

    // SHOW THINKING
    this.isThinking.set(true);

    // API CALL
    this.chatService.sendMessage(payload)
      .subscribe({
        next: (response) => {
           this.messages.update(messages => [
            ...messages,
            {
              role: 'bot',
              content: response.answer
            }
          ]);

          // HIDE THINKING
          this.isThinking.set(false);

          // FORCE UI UPDATE
          this.cdr.detectChanges();
          console.log('messages:', this.messages);
          this.isLoading = false;
        },

        error: (error) => {
          console.error('API Error:', error);
          this.messages.update(messages => [
            ...messages,
            {
              role: 'bot',
              content: 'Something went wrong.'
            }
          ]);
          this.isLoading = false;
          // HIDE THINKING
          this.isThinking.set(false);
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
