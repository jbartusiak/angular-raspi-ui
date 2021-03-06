import { NgModule } from '@angular/core';
import { TorrentClientComponent } from './torrent-client.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { ToolsContainer } from './containers/tools/tools.container';
import { TorrentListContainer } from './containers/torrent-list/torrent-list.container';
import { TorrentItemComponent } from './components/torrent-item/torrent-item.component';
import { StoreModule } from '@ngrx/store';

import { reducer } from './state/torrent-client.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TorrentClientEffects } from './state/torrent-client.effects';
import { AddItemContainer } from './containers/add-item/add-item.container';
import { AddItemComponent } from './components/add-item/add-item.component';
import { AddTorrentDialogComponent } from './components/add-item/add-torrent-dialog.component';
import { FunctionButtonComponent } from './components/function-button/function-button.component';
import { DeleteTorrentDialogComponent } from './components/delete-torrent-dialog/delete-torrent-dialog.component';
import { TorrentDetailContainer } from './containers/torrent-detail/torrent-detail.container';
import { TorrentSummaryComponent } from './components/torrent-details/torrent-summary/torrent-summary.component';
import { FileSummaryComponent } from './components/torrent-details/file-summary/file-summary.component';
import { FileListingComponent } from './components/torrent-details/file-listing/file-listing.component';
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { MagnetParserService } from './services/magnet-parser.service';

@NgModule({
  declarations: [
    TorrentListContainer,
    AddItemContainer,
    AddItemComponent,
    AddTorrentDialogComponent,
    TorrentClientComponent,
    ToolsContainer,
    TorrentItemComponent,
    FunctionButtonComponent,
    DeleteTorrentDialogComponent,
    TorrentDetailContainer,
    TorrentSummaryComponent,
    FileSummaryComponent,
    FileListingComponent,
  ],
  imports: [
    EffectsModule.forFeature([ TorrentClientEffects ]),
    MaterialModule,
    RouterModule.forChild(routes),
    SharedModule,
    StoreModule.forFeature('torrentClient', reducer),
  ],
  providers: [
    HttpUrlEncodingCodec,
    MagnetParserService,
  ]
})
export class TorrentClientModule {
}
