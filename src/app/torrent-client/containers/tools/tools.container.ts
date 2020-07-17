import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectionControllerService } from "../../services/selection-controller.service";
import { ITorrentItem, State } from "../../state/torrent-client.reducer";
import { select, Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import * as actions from '../../state/torrent-client.actions';
import * as selectors from '../../state/torrent-client.selectors';
import { MatDialog } from "@angular/material/dialog";
import {
  DeleteTorrentDialogComponent,
  IDeleteTorrentDialogData
} from "../../components/delete-torrent-dialog/delete-torrent-dialog.component";
import { take } from "rxjs/operators";
import { DeleteTorrentsForm } from "../../models/DeleteTorrentsForm";

@Component({
  selector: 'app-tools',
  templateUrl: './tools.container.html',
  styleUrls: [ './tools.container.scss' ]
})
export class ToolsContainer implements OnInit, OnDestroy {

  torrents: ITorrentItem[];
  selections$: Subscription;
  torrents$: Subscription;

  constructor(public selectionService: SelectionControllerService,
              private store: Store<State>,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.selections$ = this.selectionService.selections$.subscribe(
      next => console.log('new selection', next)
    );
    this.torrents$ = this.store.pipe(select(selectors.getTorrents))
      .subscribe(next => this.torrents = next);
  }

  ngOnDestroy(): void {
    this.selections$.unsubscribe();
    this.torrents$.unsubscribe();
  }

  handleStart() {
    if (!this.selectionService.snapshot.length) return;
    this.store.dispatch(new actions.StartTorrent(this.selectionService.snapshot));
    this.selectionService.clear();
  }

  handleStop() {
    if (!this.selectionService.snapshot.length) return;
    this.store.dispatch(new actions.StopTorrents(this.selectionService.snapshot));
    this.selectionService.clear();
  }

  handleDelete() {
    const selectedIds = this.selectionService.snapshot;
    if (!selectedIds.length) return;
    this.dialog
      .open<DeleteTorrentDialogComponent, IDeleteTorrentDialogData, DeleteTorrentsForm>(
        DeleteTorrentDialogComponent, {
          width: '400px',
          data: {
            names: this.torrents.filter(el => selectedIds.indexOf(el.id)!==-1).map(el => el.name)
          }
        }
      )
      .afterClosed()
      .pipe(take(1))
      .subscribe(
        result => {
          if (result) {
            console.log({
              ...result,
              ids: selectedIds,
            });
            this.store.dispatch(new actions.DeleteTorrents({
              ...result,
              ids: selectedIds,
            }))
          }
        }
      )
  }

}
