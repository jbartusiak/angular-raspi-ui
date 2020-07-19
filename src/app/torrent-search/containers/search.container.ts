import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { GetTorrentMagnet, State, Torrent } from "../state";
import * as selectors from "../state/torrent-search.selectors";
import * as actions from "../state/torrent-search.actions";

import { AddTorrent } from "../../torrent-client/state/torrent-client.actions";

import { combineLatest, Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

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
export class SearchContainer implements OnInit {

  query$: Observable<string>;
  categories$: Observable<string[]>;
  category$: Observable<string>;
  error$: Observable<string>;
  enabledProviders$: Observable<string[]>;

  results$: Observable<Torrent[]>;

  private subscription: Subscription;

  constructor(private store: Store<State>,
              private router: Router) {
  }

  ngOnInit(): void {
    this.query$ = this.store.pipe(
      select(selectors.getQuery)
    );
    this.results$ = this.store.pipe(
      select(selectors.getSearchResults)
    );
    this.category$ = this.store.pipe(
      select(selectors.getCategory)
    )
    this.categories$ = this.store.pipe(
      select(selectors.getAllCategories)
    );
    this.error$ = this.store.pipe(
      select(selectors.getError)
    );
    this.enabledProviders$ = this.store.pipe(
      select(selectors.getEnabledProviders)
    );
    this.subscription =
      combineLatest([ this.category$, this.query$, this.enabledProviders$ ])
        .pipe(
          map(([ category$, query$, enabledProviders$ ]) => ({
            category: category$,
            query: query$,
            enabledProviders: enabledProviders$,
          }))
        )
        .subscribe(
          (queryParams) => {
            if (queryParams.category && queryParams.query && queryParams.enabledProviders) {
              this.store.dispatch(new actions.PerformSearch(queryParams));
            }
          }
        );
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
