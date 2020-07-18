import { Component, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as selectors from "../state/torrent-search.selectors";
import { Observable, Subscription } from "rxjs";
import { IOptions, ITorrentProvider, State } from "../state";
import * as actions from "../state/torrent-search.actions";

@Component({
  template: `
    <app-providers-component
      [providers]="$enabledProviders | async"

      (onChecked)="updateEnabledProviders($event)"
    >
    </app-providers-component>
  `,
  selector: 'app-providers-container'
})
export class ProvidersContainer implements OnInit, OnDestroy {

  $enabledProviders: Observable<(ITorrentProvider & { enabled: boolean })[]>;
  enabledProvidersSub: Subscription;

  constructor(private store: Store<State>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new actions.LoadProviders);
    this.store.dispatch(new actions.LoadEnabledProviders);

    this.$enabledProviders = this.store.pipe(
      select(selectors.getEnabledProvidersBindable),
    );

    this.enabledProvidersSub = this.store
      .pipe(select(selectors.getEnabledProviders))
      .subscribe(
        () => this.store.pipe(select(selectors.getQuery)
        ).subscribe(query => {
          if (query) this.store.dispatch(new actions.PerformSearch(query))
        }));
  }

  ngOnDestroy(): void {
    this.enabledProvidersSub.unsubscribe();
  }

  updateEnabledProviders(change: IOptions) {
    this.store.dispatch(new actions.UpdateEnabledProviders(change));
    this.store.pipe(
      select(selectors.getQuery),
    ).subscribe(
      next => {
        if (next) this.store.dispatch(new actions.PerformSearch(next))
      }
    )
  }

}
