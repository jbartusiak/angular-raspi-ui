import { Actions, Effect, ofType } from "@ngrx/effects";
import * as searchActions from "./torrent-search.actions";
import { map, mergeMap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { TorrentSearchService } from "../service/torrent-search.service";
import { IOptions } from "./torrent-search.reducer";

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

  @Effect()
  $loadEnabledProviders = this.$actions.pipe(
    ofType(searchActions.TorrentSearchActionTypes.LoadEnabledProviders),
    mergeMap(() => this.searchService.$getEnabledProviders().pipe(
      map(result => new searchActions.LoadEnabledProvidersSuccess(result.map(el => el.name)))
    ))
  )

  @Effect()
  $updateEnabledProviders = this.$actions.pipe(
    ofType(searchActions.TorrentSearchActionTypes.UpdateEnabledProviders),
    mergeMap((options: { payload: IOptions }) =>
      this.searchService.$updateEnabledProviders(options.payload).pipe(
        map((result) =>
          new searchActions.UpdateEnabledProvidersSuccess(result)
        ),
      )
    )
  )
}