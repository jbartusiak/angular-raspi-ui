import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ITorrentProvider, State, Torrent } from '../state';
import { combineLatest, Observable } from 'rxjs';
import * as selectors from '../state/torrent-search.selectors';
import * as actions from '../state/torrent-search.actions';
import { map } from 'rxjs/operators';
import { TorrentSearchQuery } from '../models/TorrentSearchQuery';

@Injectable()
export class TorrentSearchFacade {
  enabledProvidersBindable$: Observable<(ITorrentProvider & { enabled: boolean })[]>;
  query$: Observable<string>;
  categories$: Observable<string[]>;
  category$: Observable<string>;
  error$: Observable<string>;
  enabledProviders$: Observable<string[]>;
  results$: Observable<Torrent[]>;

  queryParams$: Observable<TorrentSearchQuery>;

  constructor(private store: Store<State>) {
    this.store.dispatch(new actions.LoadProviders());
    this.store.dispatch(new actions.LoadEnabledProviders());

    this.enabledProvidersBindable$ = this.store.pipe(
      select(selectors.getEnabledProvidersBindable),
    );
    this.query$ = this.store.pipe(
      select(selectors.getQuery)
    );
    this.results$ = this.store.pipe(
      select(selectors.getSearchResults)
    );
    this.category$ = this.store.pipe(
      select(selectors.getCategory)
    );
    this.categories$ = this.store.pipe(
      select(selectors.getAllCategories)
    );
    this.error$ = this.store.pipe(
      select(selectors.getError)
    );
    this.enabledProviders$ = this.store.pipe(
      select(selectors.getEnabledProviders)
    );

    this.queryParams$ = combineLatest([ this.category$, this.query$, this.enabledProviders$ ])
      .pipe(
        map(([ category$, query$, enabledProviders$ ]) => ({
          category: category$,
          query: query$,
          enabledProviders: enabledProviders$,
        }))
      );
  }
}
