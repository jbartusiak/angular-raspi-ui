import { NgModule } from '@angular/core';
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from "../shared/material.module";
import { TorrentSearchComponent } from './torrent-search.component';
import { RouterModule } from "@angular/router";
import { routes } from "./routes";
import { ProvidersComponent } from './components/providers/providers.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import {reducer} from './state/torrent-search.reducer';
import { ProvidersContainer } from "./containers/providers.container";
import { SearchContainer } from "./containers/search.container";

@NgModule({
  declarations: [
    TorrentSearchComponent,
    ProvidersContainer,
    ProvidersComponent,
    SearchContainer,
    SearchComponent
  ],
  imports: [
    SharedModule,
    MaterialModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('torrentSearch', reducer),
    FormsModule,
  ]
})
export class TorrentSearchModule { }
