import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { State } from "../state";
import * as torrentSearchSelectors from "../state/torrent-search.selectors";
import { Observable } from "rxjs";

@Component({
  template: `
    <app-search-component
        [query]="$query | async"
        (onQueryChanged)="handleQueryChange($event)"
    >
    </app-search-component>
    <app-results-component>
    </app-results-component>
  `,
  selector: 'app-search-container'
})
export class SearchContainer implements OnInit{

  $query: Observable<string>;

  constructor(private store: Store<State>) {
  }

  ngOnInit(): void {
    this.$query = this.store.pipe(
      select(torrentSearchSelectors.getQuery)
    );
  }

  handleQueryChange(query: string) {

  }

}
