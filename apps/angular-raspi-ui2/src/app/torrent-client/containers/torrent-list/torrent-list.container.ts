import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ITorrentItem, State } from '../../state/torrent-client.reducer';
import * as actions from '../../state/torrent-client.actions';
import * as selectors from '../../state/torrent-client.selectors';
import { interval, Observable, Subscription } from 'rxjs';
import { SelectionEvent } from '../../events/SelectionEvent';
import { SelectionControllerService } from '../../services/selection-controller.service';
import { map } from 'rxjs/operators';
import { ETorrentItemStatusDisplay } from '../../models/TorrentItemStatusDisplay';
import { Router } from '@angular/router';

@Component({
  selector: 'app-torrent-list',
  template: `
    <mat-list class="Container mat-elevation-z5">
      <app-torrent-item
        *ngFor="let torrent of torrents$ | async"
        [displayStatus]="displayStatus"
        [torrent]="torrent"
        [isSelected]="this.selectionService.isSelected(torrent.id)"
        (onSelection)="handleSelection($event)"
        (onDetails)="handleDetails($event)">
      </app-torrent-item>
    </mat-list>
    <app-add-item-container>
    </app-add-item-container>
  `,
  styles: [ `
    .Container {
      margin: 8px 0;
      padding: 8px 0;
    }
  ` ]
})
export class TorrentListContainer implements OnInit, OnDestroy {
  torrents$: Observable<ITorrentItem[]>;
  displayStatus: ETorrentItemStatusDisplay = 0;

  private intervalSub: Subscription;
  private displayStatusSub: Subscription;

  constructor(private store: Store<State>,
              private router: Router,
              public selectionService: SelectionControllerService) {
  }

  ngOnInit(): void {
    this.store.dispatch(new actions.LoadTorrents());
    this.intervalSub = interval(12000).subscribe(
      () => this.store.dispatch(new actions.LoadTorrents())
    );
    this.displayStatusSub =
      interval(4000)
        .pipe(
          map(next => (next + 1) % 3))
        .subscribe(
          next => this.displayStatus = next);
    this.torrents$ = this.store.pipe(
      select(selectors.getTorrents)
    );
  }

  ngOnDestroy(): void {
    this.intervalSub.unsubscribe();
    this.displayStatusSub.unsubscribe();
  }

  handleSelection({torrentId, selected}: SelectionEvent) {
    if (selected) {
      this.selectionService.select(torrentId);
    } else { this.selectionService.deselect(torrentId); }
  }

  handleDetails(torrentId: number) {
    console.log(torrentId);
    this.router.navigate(['/torrent-client', torrentId]);
  }
}
