import { Action } from "@ngrx/store";
import { ITorrentProvider } from "./torrent-search.reducer";

export enum TorrentSearchActionTypes {
  LoadProviders = '[TORRENT-SEARCH] Load Providers',
  LoadProvidersSuccess = '[TORRENT-SEARCH] Load Providers Success',
  LoadProvidersFail = '[TORRENT-SEARCH] Load Providers Fail',
}

export class LoadProviders implements Action {
  readonly type = TorrentSearchActionTypes.LoadProviders;
}

export class LoadProvidersSuccess implements Action {
  readonly type = TorrentSearchActionTypes.LoadProvidersSuccess;

  constructor(public payload: ITorrentProvider[]) {
  }
}

export class LoadProvidersFail implements Action {
  readonly type = TorrentSearchActionTypes.LoadProvidersFail;
  constructor(public payload: string) {
  }
}

export type TorrentSearchActions =
  LoadProviders |
  LoadProvidersSuccess |
  LoadProvidersFail;
