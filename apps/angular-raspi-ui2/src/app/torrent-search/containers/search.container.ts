import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetTorrentMagnet, State, Torrent } from '../state';
import * as actions from '../state/torrent-search.actions';

import { AddTorrent } from '../../torrent-client/state/torrent-client.actions';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TorrentSearchFacade } from '../service/torrent-search.facade';
import { SubSink } from 'subsink';

@Component({
  template: `
    <app-search-component
      [categories]="categories$ | async"
      [selectedCategory]="category$ | async"
      [query]="query$ | async"
      (onQueryChanged)="handleQueryChange($event)"
      (onCategoryChanged)="handleCategoryChange($event)"
    >
    </app-search-component>
    <app-results-component
      [results]="results$ | async"
      [error]="error$ | async"
      (download)="handleDownload($event)"
    >
    </app-results-component>
  `,
  selector: 'app-search-container'
})
export class SearchContainer implements OnDestroy {

  query$: Observable<string>;
  categories$: Observable<string[]>;
  category$: Observable<string>;
  error$: Observable<string>;
  enabledProviders$: Observable<string[]>;

  results$: Observable<Torrent[]>;

  private sub: SubSink;

  constructor(private store: Store<State>,
              private router: Router,
              private facade: TorrentSearchFacade) {
    this.sub = new SubSink();

    this.query$ = this.facade.query$;
    this.results$ = this.facade.results$;
    this.category$ = this.facade.category$;
    this.categories$ = this.facade.categories$;
    this.error$ = this.facade.error$;
    this.enabledProviders$ = this.facade.enabledProviders$;

    this.sub.sink =
      this.facade.queryParams$
        .subscribe(
          (queryParams) => {
            if (queryParams.category && queryParams.query && queryParams.enabledProviders) {
              this.store.dispatch(new actions.PerformSearch(queryParams));
            }
          }
        );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  handleQueryChange(query: string) {
    this.store.dispatch(new actions.UpdateQuery(query));
  }

  handleCategoryChange(category: string) {
    this.store.dispatch(new actions.UpdateCategory(category));
  }

  handleDownload(torrent: Torrent) {
    if (torrent.magnet) {
      this.store.dispatch(new AddTorrent(torrent));
    }
    if (!torrent.magnet) {
      this.store.dispatch(new GetTorrentMagnet(torrent));
    }
    this.router.navigate([ '/torrent-client' ]);
  }
}
