import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as torrentSearchSelectors from "../state/torrent-search.selectors";
import { Observable } from "rxjs";
import { IOptions, ITorrentProvider, State } from "../state";
import * as torrentSearchActions from "../state/torrent-search.actions";

@Component({
  template: `
    <app-providers-component
      [providers]="$providers | async"
      [enabledProviders]="$enabledProviders | async"

      (onChecked)="updateEnabledProviders($event)"
    >
    </app-providers-component>
  `,
  selector: 'app-providers-container'
})
export class ProvidersContainer implements OnInit {

  $providers: Observable<ITorrentProvider[]>;
  $enabledProviders: Observable<string[]>;

  constructor(private store: Store<State>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new torrentSearchActions.LoadProviders);
    this.store.dispatch(new torrentSearchActions.LoadEnabledProviders);

    this.$providers = this.store.pipe(
      select(torrentSearchSelectors.getAllProviders)
    );

    this.$enabledProviders = this.store.pipe(
      select(torrentSearchSelectors.getEnabledProviders)
    );
  }

  updateEnabledProviders(change: IOptions) {
    this.store.dispatch(new torrentSearchActions.UpdateEnabledProviders(change));
  }

}
