import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as selectors from "../state/torrent-search.selectors";
import { Observable } from "rxjs";
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
export class ProvidersContainer implements OnInit {

  $enabledProviders: Observable<(ITorrentProvider & { enabled: boolean })[]>;

  constructor(private store: Store<State>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new actions.LoadProviders);
    this.store.dispatch(new actions.LoadEnabledProviders);

    this.$enabledProviders = this.store.pipe(
      select(selectors.getEnabledProvidersBindable),
    );
  }

  updateEnabledProviders(change: IOptions) {
    this.store.dispatch(new actions.UpdateEnabledProviders(change));
  }

}
