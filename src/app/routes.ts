import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', loadChildren: () => import('./services/services.module').then(m => m.ServicesModule)},
  {path: '**', redirectTo: ''},
];
