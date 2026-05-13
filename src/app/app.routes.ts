import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: '',
    loadChildren: () =>
      import('./chat/routes')
        .then(m => m.CHAT_ROUTES)
  }
];
