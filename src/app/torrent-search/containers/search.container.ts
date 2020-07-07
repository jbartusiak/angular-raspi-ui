import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { State, Torrent } from "../state";
import * as selectors from "../state/torrent-search.selectors";
import * as actions from "../state/torrent-search.actions";
import { Observable } from "rxjs";

@Component({
  template: `
    <app-search-component
      [categories]="$categories | async"
      [selectedCategory]="$category | async"
      [query]="$query | async"
      (onQueryChanged)="handleQueryChange($event)"
    >
    </app-search-component>
    <app-results-component
        [results]="$results | async"
    >
    </app-results-component>
  `,
  selector: 'app-search-container'
})
export class SearchContainer implements OnInit {

  $query: Observable<string>;
  $categories: Observable<string[]>;
  $category: Observable<string>;

  $results: Observable<Torrent[]>;

  constructor(private store: Store<State>) {
  }

  ngOnInit(): void {
    this.$query = this.store.pipe(
      select(selectors.getQuery)
    );
    this.$results = this.store.pipe(
      select(selectors.getSearchResults)
    );
    this.$category = this.store.pipe(
      select(selectors.getCategory)
    )
    this.$categories = this.store.pipe(
      select(selectors.getAllCategories)
    );
  }

  handleQueryChange(query: string) {
    this.store.dispatch(new actions.UpdateQuery(query));
    this.store.dispatch(new actions.PerformSearch(query));
  }

}
