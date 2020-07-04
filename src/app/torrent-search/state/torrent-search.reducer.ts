import * as fromRoot from "../../app.state";
import { state } from "@angular/animations";

export interface Torrent {
  title: string;
  time: string;
  size: string;
  magnet: string;
  desc: string;
  provider: string;
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

export const reducer = (state=initialState, action): ITorrentSearchState => {
  return {...state};
}
