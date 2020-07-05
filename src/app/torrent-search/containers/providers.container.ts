import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as torrentSearchSelectors from "../state/torrent-search.selectors";
import { Observable } from "rxjs";
import { ITorrentProvider, State } from "../state/torrent-search.reducer";
import { TorrentSearchService } from "../service/torrent-search.service";
import * as torrentSearchActions from "../state/torrent-search.actions";

@Component({
  template: `
    <app-providers-component
        [providers]="$providers | async"
        [enabledProviders] = "$enabledProviders | async"
    >
    </app-providers-component>
  `,
  selector: 'app-providers-container'
})
export class ProvidersContainer implements OnInit{

  $providers: Observable<ITorrentProvider[]>;
  $enabledProviders: Observable<string[]>;

  constructor(private store: Store<State>, private torrentSearchService: TorrentSearchService) {
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



}
