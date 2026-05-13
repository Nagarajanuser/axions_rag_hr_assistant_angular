import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatRequest, ChatResponse } from '../model/chat.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  private http = inject(HttpClient);

  private apiUrl = 'http://127.0.0.1:8000/chat';

  sendMessage(payload: ChatRequest): Observable<ChatResponse> {

    return this.http.post<ChatResponse>(
      this.apiUrl,
      payload
    );
  }
  
}
