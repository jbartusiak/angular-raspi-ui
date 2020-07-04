import { Actions, Effect, ofType } from "@ngrx/effects";
import * as searchActions from "./torrent-search.actions";
import { map, mergeMap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { TorrentSearchService } from "../service/torrent-search.service";

@Injectable({
  providedIn: 'root'
})
export class TorrentSearchEffect {
  constructor(private $actions: Actions,
              private searchService: TorrentSearchService) {
  }

  @Effect()
  $loadProviders = this.$actions.pipe(
    ofType(searchActions.TorrentSearchActionTypes.LoadProviders),
    mergeMap(() => this.searchService.$getAllProviders().pipe(
      map(result => new searchActions.LoadProvidersSuccess(result))
    ))
  );
}
