import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as torrentSearchSelectors from "../state/torrent-search.selectors";
import { Observable } from "rxjs";
import { ITorrentProvider, State } from "../state/torrent-search.reducer";

@Component({
  template: `
    <app-providers-component
        [providers]="$providers | async">
    </app-providers-component>
  `,
  selector: 'app-providers-container'
})
export class ProvidersContainer implements OnInit{

  $providers: Observable<ITorrentProvider[]>;

  constructor(private store: Store<State>) {
  }

  ngOnInit(): void {
    this.$providers = this.store.pipe(
      select(torrentSearchSelectors.getAllProviders)
    );
  }



}
