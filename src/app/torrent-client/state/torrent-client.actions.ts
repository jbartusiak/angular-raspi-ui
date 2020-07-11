import { Action } from "@ngrx/store";
import { ITorrentItem } from "./torrent-client.reducer";
import { Torrent } from "../../torrent-search/state";


export enum TorrentClientActionTypes {
  LoadTorrents = '[TORRENT CLIENT] Load Torrents',
  LoadTorrentsSuccess = '[TORRENT CLIENT] Load Torrents Success',
  LoadTorrentsFail = '[TORRENT CLIENT] Load Torrents Fail',

  AddTorrent = '[TORRENT CLIENT] Add Torrent',
  ClearTorrent = '[TORRENT CLIENT] Clear Torrent',
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

export class AddTorrent implements Action {
  readonly type = TorrentClientActionTypes.AddTorrent;

  constructor(public payload: Torrent) {
  }
}

export class ClearTorrent implements Action {
  readonly type = TorrentClientActionTypes.ClearTorrent;
}

export type TorrentClientActions =
  LoadTorrents |
  LoadTorrentsSuccess |
  LoadTorrentsFail |
  AddTorrent |
  ClearTorrent
  ;
