import { Routes } from '@angular/router';

export const CHAT_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./pages/chat-home/chat-home')
        .then(m => m.ChatHome)
  },

  {
    path: 'history',
    loadComponent: () =>
      import('./pages/chat-history/chat-history')
        .then(m => m.ChatHistory)
  },

  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/chat-settings/chat-settings')
        .then(m => m.ChatSettings)
  }

];