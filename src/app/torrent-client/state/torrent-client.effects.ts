import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as actions from './torrent-client.actions';
import { map, mergeMap } from "rxjs/operators";
import { TorrentClientService } from "../services/torrent-client.service";

@Injectable({
  providedIn: 'root',
})
export class TorrentClientEffects {

  constructor(private $actions: Actions,
              private client: TorrentClientService) {
  }

  @Effect()
  loadTorrents$ = this.$actions.pipe(
    ofType(actions.TorrentClientActionTypes.LoadTorrents),
    mergeMap(() => this.client.loadTorrents$().pipe(
      map(
        result => new actions.LoadTorrentsSuccess(result))
      )
    )
  )
}
