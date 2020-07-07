import * as fromRoot from "../../app.state";
import { TorrentSearchActions, TorrentSearchActionTypes } from "./torrent-search.actions";

export interface Torrent {
  title: string;
  time: string;
  size: string;
  magnet: string;
  desc: string;
  provider: string;
}

export interface IOptions {
  [name: string]: boolean;
}

export interface ITorrentProvider {
  name: string;
  public: string;
  categories: string[];
}

export interface ITorrentSearchState {
  allProviders: ITorrentProvider[];
  categories: string[];
  category: string;
  enabledProviders: string[];
  error: string;
  query: string;
  results: Torrent[];
}

export interface State extends fromRoot.State {
  torrentSearch: ITorrentSearchState;
}

const initialState: ITorrentSearchState = {
  allProviders: [],
  categories: [],
  category: '',
  enabledProviders: [],
  error: '',
  query: '',
  results: [],
};

export const reducer = (state=initialState, action: TorrentSearchActions): ITorrentSearchState => {
  switch (action.type) {
    case TorrentSearchActionTypes.LoadProvidersSuccess:
      return {
        ...state,
        allProviders: action.payload,
      }
    case TorrentSearchActionTypes.LoadProvidersFail:
      return {
        ...state,
        error: action.payload,
      }
    case TorrentSearchActionTypes.LoadEnabledProvidersSuccess:
    case TorrentSearchActionTypes.UpdateEnabledProvidersSuccess:
      return {
        ...state,
        error: '',
        enabledProviders: action.payload,
      }
    case TorrentSearchActionTypes.LoadEnabledProvidersFail:
      return {
        ...state,
        error: action.payload,
      }
    case TorrentSearchActionTypes.UpdateQuery:
      return {
        ...state,
        query: action.payload,
      }
    case TorrentSearchActionTypes.PerformSearchSuccess:
      return {
        ...state,
        results: action.payload,
      }
    default:
      return  {...state};
  }
}
