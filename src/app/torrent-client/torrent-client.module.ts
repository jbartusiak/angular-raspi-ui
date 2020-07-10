import { NgModule } from '@angular/core';
import { TorrentClientComponent } from './torrent-client.component';
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from "../shared/material.module";
import { RouterModule } from "@angular/router";
import { routes } from "./routes";
import { ToolsContainer } from './containers/tools/tools.container';
import { TorrentListContainer } from "./containers/torrent-list/torrent-list.container";
import { TorrentItemComponent } from "./components/torrent-item/torrent-item.component";
import { StoreModule } from "@ngrx/store";

import {reducer} from './state/torrent-client.reducer';

@NgModule({
  declarations: [
    TorrentClientComponent,
    ToolsContainer,
    TorrentListContainer,
    TorrentItemComponent,
  ],
  imports: [
    SharedModule,
    MaterialModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('torrentClient', reducer)
  ]
})
export class TorrentClientModule { }
