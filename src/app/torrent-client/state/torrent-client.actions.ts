import { Action } from "@ngrx/store";
import { ITorrentItem } from "./torrent-client.reducer";
import { Torrent } from "../../torrent-search/state";
import { NewTorrentForm } from "../models/NewTorrentForm";
import { DeleteTorrentsForm } from "../models/DeleteTorrentsForm";


export enum TorrentClientActionTypes {
  LoadTorrents = '[TORRENT CLIENT] Load Torrents',
  LoadTorrentsSuccess = '[TORRENT CLIENT] Load Torrents Success',
  LoadTorrentsFail = '[TORRENT CLIENT] Load Torrents Fail',

  AddTorrent = '[TORRENT CLIENT] Add Torrent',
  ClearTorrent = '[TORRENT CLIENT] Clear Torrent',

  DownloadTorrent = '[TORRENT CLIENT] Download Torrent',
  DownloadTorrentSuccess = '[TORRENT CLIENT] Download Torrent Success',
  DownloadTorrentFail = '[TORRENT CLIENT] Download Torrent Fail',

  StartTorrents = '[TORRENT CLIENT] Start Torrents',
  StartTorrentsSuccess = '[TORRENT CLIENT] Start Torrents Success',
  StartTorrentsFail = '[TORRENT CLIENT] Start Torrents Fail',

  StopTorrents = '[TORRENT CLIENT] Stop Torrents',
  StopTorrentsSuccess = '[TORRENT CLIENT] Stop Torrents Success',
  StopTorrentsFail = '[TORRENT CLIENT] Stop Torrents Fail',

  DeleteTorrents = '[TORRENT CLIENT] Delete Torrents',
  DeleteTorrentsSuccess = '[TORRENT CLIENT] Delete Torrents Success',
  DeleteTorrentsFail = '[TORRENT CLIENT] Delete Torrents Fail',
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

export class DownloadTorrent implements Action {
  readonly type = TorrentClientActionTypes.DownloadTorrent;

  constructor(public payload: NewTorrentForm) {
  }
}

export class DownloadTorrentSuccess implements Action {
  readonly type = TorrentClientActionTypes.DownloadTorrentSuccess;
}

export class DownloadTorrentFail implements Action {
  readonly type = TorrentClientActionTypes.DownloadTorrentFail;

  constructor(public payload: string) {
  }
}

export class StartTorrent implements Action {
  readonly type = TorrentClientActionTypes.StartTorrents;

  constructor(public payload: number[]) {
  }
}

export class StartTorrentSuccess implements Action {
  readonly type = TorrentClientActionTypes.StartTorrentsSuccess;
}

export class StartTorrentFail implements Action {
  readonly type = TorrentClientActionTypes.StartTorrentsFail;

  constructor(public payload: string) {
  }
}

export class StopTorrents implements Action {
  readonly type = TorrentClientActionTypes.StopTorrents;

  constructor(public payload: number[]) {
  }
}

export class StopTorrentsSuccess implements Action {
  readonly type = TorrentClientActionTypes.StopTorrentsSuccess;
}

export class StopTorrentsFail implements Action {
  readonly type = TorrentClientActionTypes.StopTorrentsFail;

  constructor(public payload: string) {
  }
}

export class DeleteTorrents implements Action {
  readonly type = TorrentClientActionTypes.DeleteTorrents;
  constructor(public payload: DeleteTorrentsForm) {
  }
}

export class DeleteTorrentsSuccess implements Action {
  readonly type = TorrentClientActionTypes.DeleteTorrentsSuccess;
}

export class DeleteTorrentsFail implements Action {
  readonly type = TorrentClientActionTypes.DeleteTorrentsFail;
  constructor(public payload: string) {
  }
}

export type TorrentClientActions =
  LoadTorrents |
  LoadTorrentsSuccess |
  LoadTorrentsFail |
  AddTorrent |
  ClearTorrent |
  DownloadTorrent |
  DownloadTorrentSuccess |
  DownloadTorrentFail |
  StartTorrent |
  StartTorrentSuccess |
  StartTorrentFail |
  StopTorrents |
  StopTorrentsSuccess |
  StopTorrentsFail |
  DeleteTorrents |
  DeleteTorrentsSuccess |
  DeleteTorrentsFail;
