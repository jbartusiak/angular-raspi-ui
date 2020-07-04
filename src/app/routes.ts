import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', loadChildren: () => import('./services/services.module').then(m => m.ServicesModule)},
  {path: 'torrent-search', loadChildren: () => import('./torrent-search/torrent-search.module').then(m => m.TorrentSearchModule)},
  {path: '**', redirectTo: ''},
];
