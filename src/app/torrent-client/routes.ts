import { Routes } from '@angular/router';
import { TorrentClientComponent } from "./torrent-client.component";
import { TorrentDetailContainer } from "./containers/torrent-detail/torrent-detail.container";

export const routes: Routes = [
  {path: '', component: TorrentClientComponent},
  {path: ':id', component: TorrentDetailContainer}
];
