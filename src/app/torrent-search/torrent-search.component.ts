import { Component, OnInit } from '@angular/core';

import { Store } from "@ngrx/store";

import * as fromTorrentSearch from './state/torrent-search.reducer';
import { ITorrentProvider } from './state/torrent-search.reducer';
import * as torrentSearchActions from './state/torrent-search.actions';
import { Observable } from "rxjs";

@Component({
  template: `
    <app-layout>
      <app-providers-container column-a></app-providers-container>
      <app-search-container column-b></app-search-container>
    </app-layout>
  `,
  styleUrls: [ './torrent-search.component.scss' ]
})
export class TorrentSearchComponent implements OnInit {

  $providers: Observable<ITorrentProvider[]>;

  constructor(private store: Store<fromTorrentSearch.State>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new torrentSearchActions.LoadProviders);

  }

}
