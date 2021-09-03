import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { TorrentSearchComponent } from './torrent-search.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { ProvidersComponent } from './components/providers/providers.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducer, TorrentSearchEffect } from './state';
import { ProvidersContainer } from './containers/providers.container';
import { SearchContainer } from './containers/search.container';
import { EffectsModule } from '@ngrx/effects';
import { ResultsComponent } from './components/results/results.component';
import { TorrentSearchFacade } from './service/torrent-search.facade';

@NgModule({
  declarations: [
    TorrentSearchComponent,
    ProvidersContainer,
    ProvidersComponent,
    SearchContainer,
    SearchComponent,
    ResultsComponent,
  ],
  imports: [
    EffectsModule.forFeature([ TorrentSearchEffect ]),
    FormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
    SharedModule,
    StoreModule.forFeature('torrentSearch', reducer),
  ],
  providers: [
    TorrentSearchFacade,
  ]
})
export class TorrentSearchModule {
}
