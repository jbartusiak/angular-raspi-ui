import { Actions, Effect, ofType } from '@ngrx/effects';
import * as searchActions from './torrent-search.actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { TorrentSearchService } from '../service/torrent-search.service';
import { IOptions, Torrent } from './torrent-search.reducer';
import { AddTorrent } from '../../torrent-client/state/torrent-client.actions';
import { of } from 'rxjs';
import { TorrentSearchQuery } from '../models/TorrentSearchQuery';

@Injectable({
  providedIn: 'root'
})
export class TorrentSearchEffect {
  @Effect()
  loadProviders$ = this.actions$.pipe(
    ofType(searchActions.TorrentSearchActionTypes.LoadProviders),
    mergeMap(() => this.searchService.getAllProviders$().pipe(
      map(result => new searchActions.LoadProvidersSuccess(result))
    ))
  );

  @Effect()
  loadEnabledProviders$ = this.actions$.pipe(
    ofType(searchActions.TorrentSearchActionTypes.LoadEnabledProviders),
    mergeMap(() => this.searchService.getEnabledProviders$().pipe(
      map(result => new searchActions.LoadEnabledProvidersSuccess(result.map(el => el.name)))
    ))
  );

  @Effect()
  updateEnabledProviders$ = this.actions$.pipe(
    ofType(searchActions.TorrentSearchActionTypes.UpdateEnabledProviders),
    mergeMap((options: { payload: IOptions }) =>
      this.searchService.updateEnabledProviders$(options.payload).pipe(
        map((result) =>
          new searchActions.UpdateEnabledProvidersSuccess(result)
        ),
      )
    )
  );

  @Effect()
  performSearch$ = this.actions$.pipe(
    ofType(searchActions.TorrentSearchActionTypes.PerformSearch),
    mergeMap(({payload}: { payload: TorrentSearchQuery }) =>
      this.searchService.performSearch$(payload.query, payload.category, payload.resultsLimit).pipe(
        map((result) =>
          new searchActions.PerformSearchSuccess(result)
        ),
        catchError(err => {
            console.error(err);
            return of(new searchActions.PerformSearchFail(`${ err.error.message } (status code: ${ err.status })`));
          }
        )
      )
    )
  );

  @Effect()
  getTorrentMagnet$ = this.actions$.pipe(
    ofType(searchActions.TorrentSearchActionTypes.GetTorrentMagnet),
    mergeMap((action: { payload: Torrent }) =>
      this.searchService.getTorrentMagnet$(action.payload).pipe(
        switchMap(result => [
          new searchActions.GetTorrentMagnetSuccess(),
          new AddTorrent({
            ...action.payload,
            magnet: result,
          })
        ])
      )
    )
  );

  constructor(private actions$: Actions,
              private searchService: TorrentSearchService) {
  }
}
