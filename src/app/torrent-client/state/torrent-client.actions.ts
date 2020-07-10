import { Action } from "@ngrx/store";
import { ITorrentItem } from "./torrent-client.reducer";


export enum TorrentClientActionTypes {
  LoadTorrents = '[TORRENT CLIENT] Load Torrents',
  LoadTorrentsSuccess = '[TORRENT CLIENT] Load Torrents Success',
  LoadTorrentsFail = '[TORRENT CLIENT] Load Torrents Fail'
}

export class LoadTorrents implements Action {
  readonly type = TorrentClientActionTypes.LoadTorrents;
}

export class LoadTorrentsSuccess implements Action {
  readonly type = TorrentClientActionTypes.LoadTorrentsSuccess;
  constructor(public payload: ITorrentItem[]) {
  }
}

export class LoadTorrentsFail implements Action {
  readonly type = TorrentClientActionTypes.LoadTorrentsFail;
  constructor(public payload: string) {
  }
}

export type TorrentClientActions =
  LoadTorrents |
  LoadTorrentsSuccess |
  LoadTorrentsFail
;
