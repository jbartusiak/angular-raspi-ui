import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { State } from "../state";
import * as selectors from "../state/torrent-search.selectors";
import * as actions from "../state/torrent-search.actions";
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
      select(selectors.getQuery)
    );
  }

  handleQueryChange(query: string) {
    this.store.dispatch(
      new actions.UpdateQuery(query)
    );
  }

}
