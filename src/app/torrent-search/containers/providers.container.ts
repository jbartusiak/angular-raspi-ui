import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as torrentSearchSelectors from "../state/torrent-search.selectors";
import { Observable } from "rxjs";
import { IOptions, ITorrentProvider, State } from "../state";
import * as torrentSearchActions from "../state/torrent-search.actions";

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
export class ProvidersContainer implements OnInit {

  $enabledProviders: Observable<(ITorrentProvider & { enabled: boolean })[]>;

  constructor(private store: Store<State>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new torrentSearchActions.LoadProviders);
    this.store.dispatch(new torrentSearchActions.LoadEnabledProviders);

    this.$enabledProviders = this.store.pipe(
      select(torrentSearchSelectors.getEnabledProvidersBindable),
    );
  }

  updateEnabledProviders(change: IOptions) {
    this.store.dispatch(new torrentSearchActions.UpdateEnabledProviders(change));
  }

}
