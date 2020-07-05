import { Action } from "@ngrx/store";
import { ITorrentProvider } from "./torrent-search.reducer";

export enum TorrentSearchActionTypes {
  LoadProviders = '[TORRENT-SEARCH] Load Providers',
  LoadProvidersSuccess = '[TORRENT-SEARCH] Load Providers Success',
  LoadProvidersFail = '[TORRENT-SEARCH] Load Providers Fail',
  LoadEnabledProviders = '[TORRENT-SEARCH] Load Enabled Providers',
  LoadEnabledProvidersSuccess = '[TORRENT-SEARCH] Load Enabled Providers Success',
  LoadEnabledProvidersFail = '[TORRENT-SEARCH] Load Enabled Providers Fail',
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

export class LoadEnabledProviders implements Action {
  readonly type = TorrentSearchActionTypes.LoadEnabledProviders;
}

export class LoadEnabledProvidersSuccess implements Action {
  readonly type = TorrentSearchActionTypes.LoadEnabledProvidersSuccess;
  constructor(public payload: ITorrentProvider[]) {
  }
}

export class LoadEnabledProvidersFail implements Action {
  readonly type = TorrentSearchActionTypes.LoadEnabledProvidersFail;
  constructor(public payload: string) {
  }
}

export type TorrentSearchActions =
  LoadProviders |
  LoadProvidersSuccess |
  LoadProvidersFail |
  LoadEnabledProviders |
  LoadEnabledProvidersSuccess |
  LoadEnabledProvidersFail; 
