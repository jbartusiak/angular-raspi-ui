import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  AddTorrentDialogComponent,
  IAddTorrentDialogData
} from '../../components/add-item/add-torrent-dialog.component';
import { Store } from '@ngrx/store';
import { State } from '../../../services/state/services.reducer';
import * as servicesSelectors from '../../../services/state/service.selectors';
import { map, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { getTorrentToDownload } from '../../state/torrent-client.selectors';
import { Torrent } from '../../../torrent-search/state';
import { ClearTorrent, DownloadTorrent } from '../../state/torrent-client.actions';

@Component({
  selector: 'app-add-item-container',
  template: `
    <app-add-item-component (showModal)="handleShowModal()"></app-add-item-component>`
})
export class AddItemContainer implements OnInit, OnDestroy {
  configuration: { categories: string[], directories: string[] };

  private serviceSub: Subscription;
  private torrentSub: Subscription;

  constructor(private dialog: MatDialog, private store: Store<State>) {
  }

  ngOnInit(): void {
    this.serviceSub = this.store
      .select(servicesSelectors.getServices)
      .pipe(map(result => Object.values(result)))
      .subscribe(
        (services) => {
          const fromState = services.filter(el => el.name === 'Torrent Backend Service').map(el => el.configuration)[0];
          this.configuration = {
            categories: fromState.categories,
            directories: fromState.directories
          };
        }
      );
    this.torrentSub = this.store.select(getTorrentToDownload).subscribe(
      next => {
        if (next) {
          this.store.dispatch(new ClearTorrent());
          this.handleShowModal(next);
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.serviceSub) { this.serviceSub.unsubscribe(); }
    if (this.torrentSub) { this.torrentSub.unsubscribe(); }
  }

  handleShowModal(torrent?: Torrent) {
    const dialogRef = this.dialog
      .open<AddTorrentDialogComponent, IAddTorrentDialogData>(AddTorrentDialogComponent, {
        width: '500px',
        data: {
          ...this.configuration,
          magnet: torrent?.magnet || '',
          size: torrent?.size || '',
          title: torrent?.title || '',
        }
      });
    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe(next => {
        if (next) {
          this.store.dispatch(new DownloadTorrent(next));
        }
      });
  }
}
