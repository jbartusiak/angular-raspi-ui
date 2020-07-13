import { Component, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { ITorrentItem, State } from "../../state/torrent-client.reducer";
import * as actions from '../../state/torrent-client.actions';
import * as selectors from '../../state/torrent-client.selectors';
import { interval, Observable, Subscription } from "rxjs";
import { SelectionEvent } from "../../events/SelectionEvent";
import { SelectionControllerService } from "../../services/selection-controller.service";

@Component({
  selector: 'app-torrent-list',
  template: `
    <mat-list class="mat-elevation-z5 Container">

      <app-torrent-item
        *ngFor="let torrent of torrents$ | async"
        [torrent]="torrent"
        [isSelected]="this.selectionService.isSelected(torrent.id)"
        (onSelection)="handleSelection($event)">
      </app-torrent-item>

      <app-add-item-container>
      </app-add-item-container>

    </mat-list>
  `,
  styles: [ `
    .Container {
      margin: 16px auto;
    }
  ` ]
})
export class TorrentListContainer implements OnInit, OnDestroy {
  torrents$: Observable<ITorrentItem[]>;

  private interval$: Subscription;

  constructor(private store: Store<State>,
              public selectionService: SelectionControllerService) {
  }

  ngOnInit(): void {
    this.store.dispatch(new actions.LoadTorrents());
    this.interval$ = interval(5000).subscribe(
      () => this.store.dispatch(new actions.LoadTorrents())
    );
    this.torrents$ = this.store.pipe(
      select(selectors.getTorrents)
    );
  }

  ngOnDestroy(): void {
    this.interval$.unsubscribe();
  }

  handleSelection({torrentId, selected}: SelectionEvent) {
    if (selected) {
      this.selectionService.select(torrentId);
    } else this.selectionService.deselect(torrentId);
  }
}
