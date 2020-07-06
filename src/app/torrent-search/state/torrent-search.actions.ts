import { Action } from "@ngrx/store";
import { IOptions, ITorrentProvider } from "./torrent-search.reducer";

export enum TorrentSearchActionTypes {
  LoadProviders = '[TORRENT-SEARCH] Load Providers',
  LoadProvidersSuccess = '[TORRENT-SEARCH] Load Providers Success',
  LoadProvidersFail = '[TORRENT-SEARCH] Load Providers Fail',

  LoadEnabledProviders = '[TORRENT-SEARCH] Load Enabled Providers',
  LoadEnabledProvidersSuccess = '[TORRENT-SEARCH] Load Enabled Providers Success',
  LoadEnabledProvidersFail = '[TORRENT-SEARCH] Load Enabled Providers Fail',

  UpdateEnabledProviders = '[TORRENT-SEARCH] Update Enabled Providers',
  UpdateEnabledProvidersSuccess = '[TORRENT-SEARCH] Update Enabled Providers Success',
  UpdateEnabledProvidersFail = '[TORRENT-SEARCH] Update Enabled Providers Fail',
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
  constructor(public payload: string[]) {
  }
}

export class LoadEnabledProvidersFail implements Action {
  readonly type = TorrentSearchActionTypes.LoadEnabledProvidersFail;
  constructor(public payload: string) {
  }
}

export class UpdateEnabledProviders implements Action {
  readonly type = TorrentSearchActionTypes.UpdateEnabledProviders;
  constructor(public payload: IOptions) {
  }
}

export class UpdateEnabledProvidersSuccess implements Action {
  readonly type = TorrentSearchActionTypes.UpdateEnabledProvidersSuccess;
  constructor(public payload: string[]) {
  }
}

export class UpdateEnabledProvidersFail implements Action {
  readonly type = TorrentSearchActionTypes.UpdateEnabledProvidersFail;
  constructor(public payload: string) {
  }
}

export type TorrentSearchActions =
  LoadProviders |
  LoadProvidersSuccess |
  LoadProvidersFail |
  LoadEnabledProviders |
  LoadEnabledProvidersSuccess |
  LoadEnabledProvidersFail |
  UpdateEnabledProviders |
  UpdateEnabledProvidersSuccess |
  UpdateEnabledProvidersFail;