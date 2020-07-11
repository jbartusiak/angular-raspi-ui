import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as actions from './torrent-client.actions';
import { map, mergeMap, switchMap } from "rxjs/operators";
import { TorrentClientService } from "../services/torrent-client.service";
import { NewTorrentForm } from "../models/NewTorrentForm";

@Injectable({
  providedIn: 'root',
})
export class TorrentClientEffects {

  constructor(private actions$: Actions,
              private client: TorrentClientService) {
  }

  @Effect()
  loadTorrents$ = this.actions$.pipe(
    ofType(actions.TorrentClientActionTypes.LoadTorrents),
    mergeMap(() => this.client.loadTorrents$().pipe(
      map(
        result => new actions.LoadTorrentsSuccess(result))
      )
    )
  )

  @Effect()
  downloadTorrent$ = this.actions$.pipe(
    ofType(actions.TorrentClientActionTypes.DownloadTorrent),
    mergeMap((action: { payload: NewTorrentForm }) => this.client.addNewTorrent$(action.payload).pipe(
      switchMap(() => [
        new actions.DownloadTorrentSuccess(),
      ])
      )
    )
  );
}
