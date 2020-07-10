import { Component, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { ITorrentItem, State } from "../../state/torrent-client.reducer";
import * as actions from '../../state/torrent-client.actions';
import * as selectors from '../../state/torrent-client.selectors';
import { interval, Subscription } from "rxjs";

@Component({
  selector: 'app-torrent-list',
  template: `
    <mat-list class="mat-elevation-z5 Container">
      <app-torrent-item *ngFor="let torrent of torrents" [torrent]="torrent"></app-torrent-item>
    </mat-list>
  `,
  styles: [ `
    .Container {
      margin: 16px auto;
    }
  ` ]
})
export class TorrentListContainer implements OnInit, OnDestroy {
  torrents: ITorrentItem[] = [];

  private torrents$: Subscription;
  private interval$: Subscription;

  constructor(private store: Store<State>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new actions.LoadTorrents());
    this.interval$ = interval(5000).subscribe(
      () => this.store.dispatch(new actions.LoadTorrents())
    );
    this.torrents$ = this.store.pipe(
      select(selectors.getTorrents)
    ).subscribe(
      next => this.torrents = next
    );
  }

  ngOnDestroy(): void {
    this.interval$.unsubscribe();
    this.torrents$.unsubscribe();
  }

}
